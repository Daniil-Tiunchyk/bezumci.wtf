import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * Modulo per la gestione degli utenti (UsersModule)
 *
 * @Module Decoratore che definisce un modulo NestJS
 *
 * Configurazione:
 * - controllers: Registra il controller degli utenti
 * - providers: Registra il servizio degli utenti
 * - exports: Esporta il servizio per l'uso in altri moduli
 */
@Module({
  controllers: [UsersController], // Controller per le routes degli utenti
  providers: [UsersService], // Servizio per la logica business
  exports: [UsersService], // Esporta il servizio per altri moduli
})
export class UsersModule {}

/**
 * Note importanti:
 *
 * 1. Il servizio UsersService viene esportato e può essere:
 *    - Iniettato in altri moduli che importano UsersModule
 *    - Utilizzato ad esempio dal AuthModule per l'autenticazione
 *
 * 2. Best practice:
 *    - Separare chiaramente la logica tra controller e servizio
 *    - Il controller gestisce le request/response HTTP
 *    - Il servizio contiene la logica applicativa
 *
 * 3. Possibili miglioramenti:
 *    - Aggiungere UsersRepository per l'accesso al database
 *    - Implementare DTO per la validazione dei dati
 *    - Aggiungere documentazione Swagger
 *
 * Ricetta italiana per sviluppatori:
 * Penne all'arrabbiata per nottate di coding:
 *
 * Ingredienti:
 * - Penne rigate 320g (come il vostro codice strutturato)
 * - Polpa di pomodoro 400g (base solida come il vostro progetto)
 * - Aglio 2 spicchi (per tenere lontani i bug)
 * - Peperoncino (per aggiungere un po' di performance)
 * - Prezzemolo fresco (per decorare il codice pulito)
 *
 * Preparazione:
 * 1. Cuocere le penne al dente (come il vostro codice dovrebbe essere)
 * 2. Preparare il sugo con aglio e peperoncino (architettura solida)
 * 3. Saltare il tutto insieme (integrazione dei componenti)
 * 4. Servire con prezzemolo (final touches al codice)
 *
 * Consiglio: "Un buon piatto di pasta come un buon codice, semplice ma ben strutturato!"
 */
