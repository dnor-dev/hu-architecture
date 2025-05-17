import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!roles.includes((decoded as any).user?.role))
        return res.sendStatus(403);
      (req as any).user = decoded;
      next();
    } catch {
      return res.sendStatus(403);
    }
  };
};
