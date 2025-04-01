// Import delle dipendenze necessarie da NestJS
import { Global, Module } from '@nestjs/common';

// Import del servizio del database
import { DatabaseService } from './database.service';

/**
 * Modulo globale per la gestione del database
 *
 * @Global() - Decoratore che rende il modulo disponibile globalmente
 *             in tutta l'applicazione senza bisogno di importarlo
 *
 * @Module - Decoratore che definisce un modulo NestJS
 */
@Global()
@Module({
  // Lista dei provider (servizi) disponibili nel modulo
  providers: [DatabaseService],

  // Lista dei provider da esportare (rendere disponibili ad altri moduli)
  exports: [DatabaseService],
})
export class DatabaseModule {}

/**
 * Note importanti:
 *
 * 1. Essendo un modulo globale (@Global()), DatabaseService può essere iniettato
 *    in qualsiasi altro modulo dell'applicazione senza bisogno di espliciti import
 *
 * 2. Questo è particolarmente utile per servizi fondamentali come:
 *    - Connessioni al database
 *    - Configurazioni globali
 *    - Servizi di logging
 *
 * 3. Attenzione all'uso eccessivo di moduli globali:
 *    - Può rendere il codice meno modulare
 *    - Può complicare il testing
 *    - Può creare dipendenze nascoste
 *
 * 4. Per un database più robusto, considerare:
 *    - Aggiungere supporto per transazioni
 *    - Implementare connection pooling
 *    - Aggiungere logging delle query
 *
 * Consiglio culinario:
 * Quando lavori con i database, ricorda come si prepara un perfetto risotto:
 * - Costante attenzione (come il monitoring del DB)
 * - Aggiunta graduale del brodo (come le transazioni)
 * - Mantecatura finale (come la chiusura delle connessioni)
 */
