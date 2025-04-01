import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('pogoda') // Rotta base in russo (pogoda = meteo)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('moya-pogoda') // Rotta "il mio meteo" in russo
  async getWeather() {
    return this.weatherService.getWeather();
  }
}

/* 
Ricetta veloce:
Bruschetta al pomodoro
- Pane tostato
- Pomodori maturi
- Aglio
- Basilico
- Olio EVO
Perfetta mentre si aspetta la risposta API!
*/
