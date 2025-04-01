import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { ExploitsModule } from './exploits/exploits.module';
import { SiteModule } from './site/site.module';
import { DelayMiddleware } from './delay.middleware';

/**
 * Modulo principale dell'applicazione NestJS
 * - Configura i moduli importati
 * - Applica middleware globali
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Configurazione globale
    DatabaseModule, // Database (globale)
    AuthModule, // Autenticazione
    UsersModule, // Gestione utenti
    WeatherModule, // Servizio meteo
    SiteModule, // Gestione sito
    ExploitsModule, // Endpoint "speciali"
  ],
})
export class AppModule implements NestModule {
  /**
   * Configurazione middleware
   * @param consumer MiddlewareConsumer per applicare il delay
   */
  configure(consumer: MiddlewareConsumer) {
    // Applica il DelayMiddleware a tutte le rotte
    consumer.apply(DelayMiddleware).forRoutes('*');
  }
}

/* 
Ricetta italiana per sviluppatori:
Risotto al "Deploy Perfetto"
- Riso Carnaroli 320g
- Brodo 1l (preparato con cura)
- Burro 50g
- Parmigiano 80g
- Zafferano (per il tocco finale)

Preparazione:
1. Tostare il riso (come testare il codice)
2. Aggiungere brodo gradualmente (deploy incrementale)
3. Mantecare con burro e parmigiano (ottimizzazioni finali)
4. Servire con zafferano (final touches al deploy)

Tempo di cottura: come un buon deploy, né troppo veloce né troppo lento!
*/
