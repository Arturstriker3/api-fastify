import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

app.listen({port: 3030}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});