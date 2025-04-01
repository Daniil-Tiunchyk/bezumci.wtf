import { NestFactory } from '@nestjs/core';
import * as swaggerUi from 'swagger-ui-express';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { generateRandomSwagger } from './swagger-generator';

/**
 * Funzione di bootstrap per avviare l'applicazione NestJS
 * - Configura CORS
 * - Setta la documentazione Swagger generata randomicamente
 * - Avvia il server sulla porta 3000
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Abilita CORS per tutte le routes
  app.enableCors();

  // Configurazione Swagger UI
  const httpAdapter = app.getHttpAdapter();
  const expressApp = httpAdapter.getInstance();

  // Serve la UI di Swagger
  expressApp.use('/api-docs', swaggerUi.serve);

  // Genera documentazione Swagger randomica
  expressApp.get(
    '/api-docs',
    (req: Request, res: Response, next: NextFunction) => {
      const swaggerDocument = generateRandomSwagger();
      return swaggerUi.setup(swaggerDocument)(req, res, next);
    },
  );

  // Avvia il server
  await app.listen(3000);
}

// Avvia l'applicazione
bootstrap();

/* 
Ricetta italiana per deploy:
Spaghetti al "Deploy Riuscito"
- Spaghetti 320g (come il tuo codice)
- Aglio 2 spicchi (per sicurezza)
- Olio d'oliva (per fluidità)
- Peperoncino (per performance)
- Prezzemolo (per il tocco finale)

Preparazione:
1. Cuocere spaghetti al dente (test completi)
2. Soffriggere aglio e peperoncino (configurazioni)
3. Unire il tutto (deploy)
4. Decorare con prezzemolo (logging)

Servire con un buon vino rosso (per celebrare)!
*/
