import z from 'zod';
import { FastifyTypedIntance } from './types/fastify-types';

export async function routes(app: FastifyTypedIntance): Promise<void> {
    app.get('/users', {
        tags: ['users'],
        description: 'List users',
    }, () => {
        return [];
    });

    app.post('/users', {
        tags: ['users'],
        description: 'Create a new user',
        schema: {
            body: z.object({
                name: z.string(),
                age: z.number(),
            }),
        },
    }, (req, reply) => {
        return req.body;
    });
}