import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export class AuthController {
  private readonly authService = new AuthService();

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.authService.login(email, password);
    if (!user) return res.sendStatus(401);

    const token = await generateToken(user);
    return res.json({ token, email: user.email });
  }

  async register(req: Request, res: Response) {
    const { email, password, name } = req.body;
    const user = await this.authService.register({ email, password });
    if (!user) return res.sendStatus(401);

    const token = await generateToken(user);
    return res.json({ token, email: user.email });
  }
}
