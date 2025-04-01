import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { DatabaseService } from './database/database.service';

export interface DelayMiddlewareOptions {
  defaultDelay?: number;
  maxDelay?: number;
}

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  private delayValue: number;

  constructor(private readonly db: DatabaseService) {}

  async use(_: Request, __: Response, next: NextFunction) {
    this.delayValue = ((await this.db.getData('siteSpeed', 1)) as any).speed;
    setTimeout(() => {
      next();
    }, this.delayValue);
  }
}
