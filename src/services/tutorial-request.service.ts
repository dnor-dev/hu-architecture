import { TutorialRequest } from "../entities/tutorial-request.entity";
import { AppDataSource } from "../config/db";
import { UserRepository } from "../repositories/user.repository";
import { TutorialAssignment } from "../entities/tutorial-assignment.entity";

export class TutorialRequestService {
  private readonly tutorialRequestRepository =
    AppDataSource.getRepository(TutorialRequest);
  private readonly userRepository = new UserRepository();
  private readonly assignmentRepository =
    AppDataSource.getRepository(TutorialAssignment);

  async findById(id: string): Promise<TutorialRequest | null> {
    return await this.tutorialRequestRepository.findOne({ where: { id } });
  }

  async listPendingRequests(): Promise<TutorialRequest[]> {
    return await this.tutorialRequestRepository.find({
      where: { status: "pending" },
    });
  }

  async createTutorialRequest(
    topic: string,
    description: string,
    user: string
  ): Promise<TutorialRequest> {
    const student = await this.userRepository.findById(user);
    if (!student) return null;

    const tutorialRequest = {
      topic,
      description,
      student,
    };

    const newTutorialRequest =
      this.tutorialRequestRepository.create(tutorialRequest);

    return await this.tutorialRequestRepository.save(newTutorialRequest);
  }

  async assignTutorialRequest(
    tutorialRequestId: string,
    adminId: string,
    tutorId: string
  ): Promise<TutorialAssignment> {
    const admin = await this.userRepository.findById(adminId);
    if (!admin) return null;

    const tutorialRequest = await this.tutorialRequestRepository.findOne({
      where: { id: tutorialRequestId },
    });
    if (!tutorialRequest) return null;

    tutorialRequest.status = "assigned";
    this.tutorialRequestRepository.save(tutorialRequest);

    const tutor = await this.userRepository.findById(tutorId);
    if (!tutor) return null;

    const newTutorialAssignment = this.assignmentRepository.create({
      tutor,
      tutorialRequest,
      assignedBy: admin,
    });

    return await this.assignmentRepository.save(newTutorialAssignment);
  }
}
