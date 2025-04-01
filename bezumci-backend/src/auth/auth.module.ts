// Import delle dipendenze necessarie da NestJS
import { Module } from '@nestjs/common';

// Import dei servizi, controller e moduli locali
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

/**
 * Modulo per la gestione dell'autenticazione
 *
 * @Module - Decoratore che definisce un modulo NestJS
 *
 * Configurazione del modulo:
 * - controllers: Lista dei controller che fanno parte di questo modulo
 * - providers: Lista dei provider (servizi) disponibili nel modulo
 * - imports: Moduli esterni richiesti da questo modulo
 */
@Module({
  // Registra il controller AuthController nel modulo
  controllers: [AuthController],

  // Registra il servizio AuthService come provider nel modulo
  providers: [AuthService],

  // Importa il modulo UsersModule per utilizzare i suoi servizi/controller
  imports: [UsersModule],
})
export class AuthModule {}

/**
 * Note importanti:
 *
 * 1. Il modulo AuthModule dipende da UsersModule, il che significa che:
 *    - Tutti i provider esportati da UsersModule sono disponibili in AuthModule
 *    - UsersModule deve essere correttamente configurato e importato
 *
 * 2. Se AuthService avesse bisogno di altri servizi esterni, questi dovrebbero essere:
 *    - Aggiunti alla lista dei providers se creati localmente
 *    - Oppure importati tramite altri moduli nella sezione imports
 *
 * 3. Se i servizi di questo modulo devono essere utilizzati da altri moduli,
 *    dovrebbero essere esportati usando la proprietà `exports` del decoratore @Module
 *    Esempio: exports: [AuthService]
 *
 * 4. Per una migliore organizzazione, potremmo considerare di:
 *    - Separare la logica di autenticazione (JWT, OAuth, etc.) in un sotto-modulo
 *    - Aggiungere configurazioni globali usando ConfigModule
 */
