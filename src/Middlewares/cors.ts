import { FastifyCorsOptions } from '@fastify/cors';
import { FastifyErrorCodes } from 'fastify';

export const corsOptions: FastifyCorsOptions = {
    origin: (origin, callback) => {
      const allowedOrigins = ['*'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        throw FastifyErrorCodes.
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  };