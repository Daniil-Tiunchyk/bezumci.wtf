import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('pogoda')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('moya-pogoda')
  async getWeather() {
    return this.weatherService.getWeather();
  }
}
