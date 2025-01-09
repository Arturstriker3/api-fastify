import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserService } from '../services/UserService';

export class UserController {
  // Método para criar um novo usuário
  static async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body;

      // Validação com Zod diretamente no controller
      const userSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
      });

      // Valida os dados recebidos
      userSchema.parse(body);

      // Chama o service para criar o usuário
      const user = await UserService.createUser(body);

      return reply.code(201).send(user); // Retorna o usuário criado
    } catch (error) {
      console.error('Error creating user:', error);
      return reply.code(400).send({ message: error.message });
    }
  }

  // Método para verificar o token
  static async verifyToken(req: FastifyRequest, reply: FastifyReply) {
    try {
      const token = req.headers.authorization;

      // Valida o token no service
      const result = await UserService.verifyToken(token);

      return reply.send(result); // Retorna a resposta
    } catch (error) {
      console.error('Error verifying token:', error);
      return reply.code(400).send({ message: error.message });
    }
  }
}