import { User, UserRole } from "../entities/user.entity";
import { AppDataSource } from "../config/db";

export class UserRepository {
  private readonly repository = AppDataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async saveUser(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async createUser(user: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }): Promise<User> {
    return this.repository.create({
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
    });
  }
}
