import { Session } from "../entities/session.entity";
import { AppDataSource } from "../config/db";
import { UserRepository } from "../repositories/user.repository";
import { TutorialRequest } from "../entities/tutorial-request.entity";
import Queue from "../jobs/queue";

export class SessionService {
  private readonly sessionRepository = AppDataSource.getRepository(Session);
  private readonly userRepository = new UserRepository();
  private readonly tutorialRequestRepository =
    AppDataSource.getRepository(TutorialRequest);

  async createSession(
    tutorialRequestId: string,
    tutorId: string,
    scheduledAt: Date
  ): Promise<Session> {
    const tutorialRequest = await this.tutorialRequestRepository.findOne({
      where: { id: tutorialRequestId },
    });
    if (!tutorialRequest) return null; // Throw error if tutorial request does not exist

    this.tutorialRequestRepository.save(tutorialRequest);
    const tutor = await this.userRepository.findById(tutorId);
    if (!tutor) return null; // Throw error if tutor does not exist

    const student = await this.userRepository.findById(
      tutorialRequest.student.id
    );

    const session = this.sessionRepository.create({
      tutor,
      student,
      scheduledAt,
    });

    await Queue.add(
      "sendReminder",
      { sessionId: session.id },
      { delay: new Date(session.scheduledAt).getTime() - 60 * 60 * 1000 }
    ); // Add to reminderQueue to send reminder in 1 hour

    return await this.sessionRepository.save(session);
  }
}
