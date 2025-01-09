import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";
import { hash } from "bcrypt";
import { CreateUserDTO } from "../dto/createUserDTO";

export class UserService {
  static async checkIfUserExists(email: string): Promise<boolean> {
    const existingUser = await UserRepository.findOne({ where: { email } });
    return existingUser !== null;
  }

  static async createUser(userData: CreateUserDTO) {
    const userExists = await UserService.checkIfUserExists(userData.email);

    if (userExists) {
      throw new Error("Email is already in use");
    }

    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.password = await hash(userData.password, 10);

    return await UserRepository.save(newUser);
  }
}