import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { Repository } from "typeorm";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    await this.repository.save(user);
    return user;
  }

  async updateUser(userId: string, email?: string, password?: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");

    if (email) user.email = email;
    if (password) user.password = password;

    await this.repository.save(user);
    return user;
  }

  async softDeleteUser(userId: string): Promise<void> {
    const user = await this.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");

    await this.repository.softDelete(userId);
  }
}