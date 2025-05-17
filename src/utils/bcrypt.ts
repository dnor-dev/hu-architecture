import { compare, hash } from "bcrypt";

export const comparePassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const hashPassword = async (password: string, rounds = 10) => {
  return await hash(password, rounds);
};
