import { FastifyTypedIntance } from './types/fastify-types';
import { UserController } from './controllers/UserController';
import { z } from 'zod';

export async function routes(app: FastifyTypedIntance): Promise<void> {
  app.post('/register', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
      }),
    },
  }, UserController.createUser);
}
