import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";

export const generateToken = async (user: User, duration = "1d") => {
  return await jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: duration,
  });
};
