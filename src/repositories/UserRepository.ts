import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';

export class UserRepository {
  static async findOne(query: object) {
    return await AppDataSource.getRepository(User).findOne(query);
  }

  static async save(user: User) {
    return await AppDataSource.getRepository(User).save(user);
  }

  static async find() {
    return await AppDataSource.getRepository(User).find();
  }
}