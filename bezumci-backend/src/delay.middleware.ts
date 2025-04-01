import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DatabaseService } from './database/database.service';

/**
 * Middleware per introdurre un delay artificiale
 * - Legge il valore di delay dal database
 * - Applica il ritardo a tutte le richieste
 */
@Injectable()
export class DelayMiddleware implements NestMiddleware {
  private delayValue: number;

  constructor(private readonly db: DatabaseService) {}

  /**
   * Implementazione del middleware
   * @param _ Request (non utilizzata)
   * @param __ Response (non utilizzata)
   * @param next Funzione per passare al prossimo middleware
   */
  async use(_: Request, __: Response, next: NextFunction) {
    // Recupera il valore di delay dal database
    this.delayValue = ((await this.db.getData('siteSpeed', 1)) as any).speed;

    // Applica il delay prima di passare alla prossima funzione
    setTimeout(() => {
      next();
    }, this.delayValue);
  }
}

/* 
Ricetta italiana per il debugging:
Caffè corretto (per nottate di debug)
- Espresso ristretto
- Grappa (solo se il bug persiste)
- Zucchero (quanto basta)

Preparazione:
1. Preparare un espresso perfetto
2. Aggiungere un goccio di grappa
3. Sorseggiare mentre si risolve il problema

Consumo:
- Uno per bug minori
- Due per bug critici
- Tre solo se il progetto è in produzione
*/
