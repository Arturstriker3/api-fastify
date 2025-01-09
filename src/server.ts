import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { corsOptions } from './Middlewares/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { envConfig } from './Helpers/envs';
import rootRoute from './Helpers/rootRoute';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './routes';

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, corsOptions);
app.register(rootRoute);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: `${envConfig.getServerName()} - API Documentation`,
      version: `${envConfig.getServerVersion()}`,
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(routes, { prefix: `${envConfig.getApiPrefix()}` });

app.listen({ port: Number(envConfig.getPort()) }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  
    const docsUrl = `${address}/docs`;
    console.log(`Server listening at ${address}`);
    console.log(`API Documentation available at ${docsUrl}`);
  });