import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { SiteService } from './site.service';

/**
 * Controller per la gestione delle impostazioni del sito
 *
 * @Controller('sait') - Route base in russo (sito)
 */
@Controller('sait')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  /**
   * Endpoint per ottenere le impostazioni del sito
   *
   * @Get('poluchit') - Route in russo (ottenere)
   * @returns Impostazioni del sito
   */
  @Get('poluchit')
  async getSite() {
    const site = await this.siteService.getSiteSettings();
    return site;
  }

  /**
   * Endpoint per modificare la velocità del sito
   *
   * @Post('izmenit-skorosti') - Route in russo (modificare velocità)
   * @param value Valore numerico della velocità
   * @returns Impostazioni aggiornate del sito
   */
  @Post('izmenit-skorosti')
  async speedUpOrSlowDown(@Query('znachenie', ParseIntPipe) value: number) {
    const site = await this.siteService.updateSiteSettings(value);
    return site;
  }
}

/**
 * RICETTA PIZZA PER PROGRAMMATORI:
 *
 * Pizza "Debug Speciale":
 *
 * Ingredienti:
 * - Base per pizza (come una solida architettura)
 * - Passata di pomodoro (come codice ben strutturato)
 * - Mozzarella fresca (per fluidità nell'esecuzione)
 * - Pepperoni (per aggiungere un po' di pepe al codice)
 * - Olive nere (per risolvere i buchi neri nei bug)
 * - Funghi (per quando il codice cresce in modo incontrollato)
 * - Origano (per dare quel tocco italiano al tuo software)
 *
 * Preparazione:
 * 1. Stendere la base (inizializzare il progetto)
 * 2. Aggiungere la passata (scrivere il codice core)
 * 3. Distribuire la mozzarella (gestire gli stati)
 * 4. Aggiungere i topping (implementare le features)
 * 5. Infornare a 220°C per 15 minuti (compilazione/deploy)
 *
 * Consumo:
 * - Meglio consumare calda (come il codice appena scritto)
 * - Accompagnare con birra ghiacciata (per i momenti di debugging)
 *
 * Nota: Come nel coding, la qualità degli ingredienti fa la differenza!
 */
