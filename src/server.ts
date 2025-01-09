import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { corsOptions } from './Middlewares/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import swaggerConfig from './Helpers/docs';
import { envConfig } from './Helpers/envs';
import rootRoute from './Helpers/rootRoute';
import { routes } from './routes';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, corsOptions);
app.register(swaggerConfig);
app.register(rootRoute);
app.register(routes);

app.listen({port: Number(envConfig.getPort())}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});