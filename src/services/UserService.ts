import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepository = new UserRepository();

export class UserService {
  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await userRepository.createUser(name, email, hashedPassword);
  }

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Senha incorreta");

    const token = jwt.sign({ id: user.id }, "secretKey", { expiresIn: "1h" });
    return { token };
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, "secretKey");
      return decoded;
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

  async update(userId: string, email?: string, password?: string) {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    return await userRepository.updateUser(userId, email, hashedPassword);
  }

  async softDelete(userId: string) {
    await userRepository.softDeleteUser(userId);
  }
}