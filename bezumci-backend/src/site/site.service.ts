import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SiteService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Ottiene le impostazioni di velocità del sito
   * @returns Le impostazioni del sito
   */
  async getSiteSettings() {
    return await this.db.getData('siteSpeed', 1);
  }

  /**
   * Aggiorna la velocità del sito
   * @param speed Il nuovo valore di velocità
   * @returns Messaggio di conferma
   * @throws Error se il sito non viene trovato
   */
  async updateSiteSettings(speed: number) {
    const site = (await this.db.getData('siteSpeed', 1))?.speed;
    if (!site) {
      throw new Error('Sito non trovato');
    }
    await this.db.updateData('siteSpeed', 1, { speed });
    return {
      message: 'Impostazioni sito aggiornate',
    };
  }
}

/* 
Extra: Ricetta veloce Pizza Margherita
Ingredienti:
- Impasto per pizza
- Salsa di pomodoro
- Mozzarella
- Basilico fresco
- Olio d'oliva

Cuocere in forno a 250°C per 10-12 minuti.
Perfetta mentre si aspetta il deploy!
*/
