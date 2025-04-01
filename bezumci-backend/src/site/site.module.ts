import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

/**
 * Modulo per la gestione delle impostazioni del sito
 *
 * @Module - Decoratore che definisce un modulo NestJS
 */
@Module({
  controllers: [SiteController], // Registra il controller
  providers: [SiteService], // Registra il servizio
})
export class SiteModule {}

/**
 * RICETTA ITALIANA PER DEPLOYARE CON SUCCESSO:
 *
 * Risotto al "Deploy Perfetto":
 *
 * Ingredienti:
 * - Riso Carnaroli 320g (base solida)
 * - Brodo vegetale 1l (ambiente di sviluppo)
 * - Vino bianco 1/2 bicchiere (per festeggiare)
 * - Burro 50g (per fluidificare)
 * - Parmigiano 80g (per la qualità)
 * - Zafferano (per il colore del successo)
 *
 * Preparazione:
 * 1. Tostare il riso (preparare il codice)
 * 2. Sfumare con vino (testare)
 * 3. Aggiungere brodo gradualmente (deploy incrementale)
 * 4. Mantecare con burro e parmigiano (ottimizzare)
 * 5. Servire con una spolverata di zafferano (final touch)
 *
 * Tempo di cottura: come un buon deployment, né troppo veloce né troppo lento!
 *
 * Consiglio:
 * "Un buon risotto come un buon deploy, richiede pazienza e attenzione ai dettagli"
 */
