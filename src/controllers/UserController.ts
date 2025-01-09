import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserService } from "../services/UserService";
import { CreateUserDTO } from "../dto/createUserDTO";

export class UserController {
  static async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const body = req.body;

      const userSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      });

      const parsedBody = userSchema.parse(body);

      const userData: CreateUserDTO = parsedBody;

      const user = await UserService.createUser(userData);

      return reply.code(201).send(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating user:", error.message);
        return reply.code(400).send({ message: error.message });
      } else {
        console.error("Unknown error:", error);
        return reply
          .code(500)
          .send({ message: "An unexpected error occurred" });
      }
    }
  }
}
