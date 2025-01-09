import { FastifyTypedIntance } from './types/fastify-types';
import { UserController } from './controllers/UserController';

export async function routes(app: FastifyTypedIntance): Promise<void> {
  app.post('/users', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
    },
  }, UserController.createUser);
}
