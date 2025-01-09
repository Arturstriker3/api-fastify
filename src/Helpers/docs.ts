import { FastifyPluginAsync } from 'fastify';
import { fastifySwagger } from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { envConfig } from './envs';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';


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
  routePrefix: '/docs',
});


export default swaggerConfig;