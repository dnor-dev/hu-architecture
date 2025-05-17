import { Request, Response } from "express";
import { SessionService } from "../services/session.service";

export class SessionController {
  private readonly sessionService = new SessionService();

  async createSession(req: Request, res: Response) {
    const tutorId = (req as any).user.id;
    const { scheduledAt } = req.body;
    const tutorialRequestId = req.params.id;

    const session = await this.sessionService.createSession(
      tutorialRequestId,
      tutorId,
      scheduledAt
    );
    if (!session) return res.sendStatus(400); // Throw error if session cannot be created

    return res.status(201).json(session);
  }
}
