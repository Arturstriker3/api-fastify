import { FastifyInstance } from "fastify";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";

const userService = new UserService();

export async function userController(fastify: FastifyInstance) {
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as { email: string; password: string };
    try {
      const result = await userService.login(email, password);
      return reply.send(result);
    } catch (error) {
      return reply.status(400).send({ error: error.message });
    }
  });

  fastify.post("/register", async (request, reply) => {
    const { name, email, password } = request.body as { name: string; email: string; password: string };
    try {
      const newUser = await userService.register(name, email, password);
      return reply.send(newUser);
    } catch (error) {
      return reply.status(400).send({ error: error.message });
    }
  });

  fastify.get("/verify-token", async (request, reply) => {
    const token = request.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return reply.status(400).send({ error: "Token não fornecido" });
    }

    try {
      const decoded = userService.verifyToken(token);
      return reply.send({ decoded });
    } catch (error) {
      return reply.status(400).send({ error: error.message });
    }
  });

  fastify.put("/update", async (request, reply) => {
    const { userId, email, password } = request.body as { userId: string; email?: string; password?: string };
    try {
      const updatedUser = await userService.update(userId, email, password);
      return reply.send(updatedUser);
    } catch (error) {
      return reply.status(400).send({ error: error.message });
    }
  });

  fastify.delete("/delete", async (request, reply) => {
    const { userId } = request.body as { userId: string };
    try {
      await userService.softDelete(userId);
      return reply.send({ message: "Usuário deletado logicamente" });
    } catch (error) {
      return reply.status(400).send({ error: error.message });
    }
  });
}