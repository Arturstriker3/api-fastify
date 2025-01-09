import z from 'zod';
import { FastifyTypedIntance } from './types/fastify-types';

export async function routes(app: FastifyTypedIntance): Promise<void> {
    app.get('/users', {
        schema: {
            tags: ['users'],
            description: 'List users',
        },
    }, () => {
        return [
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 },
        ];
    });

    app.post('/users', {
        schema: {
            tags: ['users'],
            description: 'Create a new user',
            body: z.object({
                name: z.string(),
                age: z.number(),
            }),
        },
    }, (req) => {
        return req.body;
    });
}