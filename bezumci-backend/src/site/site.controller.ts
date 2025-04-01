import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';

import { SiteService } from './site.service';

@Controller('sait')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get('poluchit')
  async getSite() {
    const site = await this.siteService.getSiteSettings();
    return site;
  }

  @Post('izmenit-skorosti')
  async speedUpOrSlowDown(@Query('znachenie', ParseIntPipe) value: number) {
    const site = await this.siteService.updateSiteSettings(value);
    return site;
  }
}
