import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SiteService {
  constructor(private readonly db: DatabaseService) {}

  async getSiteSettings() {
    const site = await this.db.getData('siteSpeed', 1);
    return site;
  }

  async updateSiteSettings(speed: number) {
    const site = ((await this.db.getData('siteSpeed', 1)) as any).speed;
    if (!site) {
      throw new Error('Сайт не найден');
    }
    await this.db.updateData('siteSpeed', 1, { speed });
    return {
      message: 'Настройки сайта обновлены',
    };
  }
}
