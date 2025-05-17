import { Request, Response } from "express";
import { TutorialRequestService } from "../services/tutorial-request.service";

export class TutorialRequestController {
  private readonly tutorialRequestService = new TutorialRequestService();

  async getRequest(req: Request, res: Response) {
    const { id } = req.params;
    const tutorialRequest = await this.tutorialRequestService.findById(id);
    if (!tutorialRequest) return res.sendStatus(404);

    return res.json(tutorialRequest);
  }

  async getAllRequests(req: Request, res: Response) {
    const tutorialRequests =
      await this.tutorialRequestService.listPendingRequests();
    return res.json(tutorialRequests);
  }

  async createTutorialRequest(req: Request, res: Response) {
    const user = (req as any).user.id;

    const { topic, description } = req.body;
    const tutorialRequest =
      await this.tutorialRequestService.createTutorialRequest(
        topic,
        description,
        user
      );
    if (!tutorialRequest) return res.sendStatus(404);

    return res.json(tutorialRequest);
  }

  async assignTutorialRequest(req: Request, res: Response) {
    const { tutorId } = req.body;
    const adminId = (req as any).user.id;
    const tutorialRequestId = req.params.id;

    const tutorialRequest =
      await this.tutorialRequestService.assignTutorialRequest(
        tutorialRequestId,
        adminId,
        tutorId
      );
    if (!tutorialRequest) return res.sendStatus(404);

    return res.json(tutorialRequest);
  }
}
