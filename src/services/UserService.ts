import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { hash } from 'bcrypt';

export class UserService {
  // Método para criar um usuário
  static async createUser(userData: { name: string; email: string; password: string }) {
    // Verifica se o usuário já existe
    const existingUser = await UserRepository.findOne({ where: { email: userData.email } });

    if (existingUser) {
      throw new Error('Email is already in use');
    }

    // Cria o novo usuário
    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.password = await hash(userData.password, 10); // Faz hash na senha antes de salvar

    // Salva no banco de dados
    return await UserRepository.save(newUser);
  }

  // Método para verificar a validade do token
  static async verifyToken(token: string) {
    // Aqui você pode implementar a verificação do token (JWT, por exemplo)
    // Verifica se o token é válido e retorna o resultado
    if (!token) {
      throw new Error('No token provided');
    }

    // Simula a validação do token
    const isValid = true; // Logica real de verificação de token

    return { isValid };
  }
}