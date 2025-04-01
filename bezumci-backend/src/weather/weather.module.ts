import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

/**
 * Modulo per le previsioni meteo
 * - Registra controller e service
 * - Endpoint disponibili sotto /pogoda
 */
@Module({
  controllers: [WeatherController], // Controller per le rotte meteo
  providers: [WeatherService], // Service per la logica meteo
})
export class WeatherModule {}

/* 
Ricetta veloce per sviluppatori:
Caffè espresso italiano
- Macinato fresco 7g
- Acqua 90°C 25ml
- Estrazione 25 secondi
Perfetto mentre si debugga!
*/
