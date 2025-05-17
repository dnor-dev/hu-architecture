import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";

export const generateToken = async (user: User, duration = "1d") => {
  return await jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: duration,
    }
  );
};
