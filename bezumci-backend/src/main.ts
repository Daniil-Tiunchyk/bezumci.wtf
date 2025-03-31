import { NestFactory } from '@nestjs/core';
import * as swaggerUi from 'swagger-ui-express';
import { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';
import { generateRandomSwagger } from './swagger-generator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter.getInstance();

  // Serve the Swagger UI static assets
  expressApp.use('/api-docs', swaggerUi.serve);

  // Use a dedicated route for the dynamic Swagger document generation.
  expressApp.get(
    '/api-docs',
    (req: Request, res: Response, next: NextFunction) => {
      const swaggerDocument = generateRandomSwagger();
      return swaggerUi.setup(swaggerDocument)(req, res, next);
    },
  );

  await app.listen(3000);
}

bootstrap();
