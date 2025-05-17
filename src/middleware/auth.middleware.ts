import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes((decoded as any).user?.role)) res.sendStatus(403);
      (req as any).user = decoded;

      next();
    } catch {
      res.sendStatus(403);
    }
  };
};
