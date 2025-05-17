import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/bcrypt";

export class AuthService {
  private readonly userRepository = new UserRepository();

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null; // Throw error if user does not exist

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) return null;

    return user;
  }

  async register(user: Partial<User>): Promise<User | null> {
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) return null; // Throw error if user already exists

    const hashedPassword = await hashPassword(user.password);

    const newUser = await this.userRepository.createUser({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      role: user.role,
    });

    const savedUser = await this.userRepository.saveUser(newUser);

    return savedUser;
  }
}
