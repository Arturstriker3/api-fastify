import { FastifyTypedIntance } from './types/fastify-types';
import { UserController } from './controllers/UserController';

export async function routes(app: FastifyTypedIntance): Promise<void> {
  app.post('/users', {
    schema: {
      tags: ['users'],
      description: 'Create a new user',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['name', 'email', 'password'],
      },
    },
  }, UserController.createUser);

  app.get('/users/verify-token', {
    schema: {
      tags: ['users'],
      description: 'Verify if the token is valid',
    },
  }, UserController.verifyToken);
}
