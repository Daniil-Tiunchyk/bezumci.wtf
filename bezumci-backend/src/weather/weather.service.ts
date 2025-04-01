import { Injectable } from '@nestjs/common';
import { fakerRU as faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  weatherApiKey: string;

  constructor(private readonly config: ConfigService) {
    // Ottiene la chiave API dal file di configurazione
    this.weatherApiKey = this.config.get<string>('WEATHER_API_KEY');
  }

  /**
   * Recupera i dati meteo da OpenWeatherMap
   * @returns Oggetto con i dati meteo simulati
   * @throws Error se la richiesta API fallisce
   */
  async getWeather() {
    // Costruisce gli URL per le API meteo e geolocalizzazione
    const randomCity = faker.location.city();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${randomCity}&units=metric&appid=${this.weatherApiKey}`;

    // Prima chiamata API per i dati meteo principali
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();

    // Struttura i dati meteo principali
    const weatherData = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      city: data.name,
      country: data.sys.country,
      coordinates: {
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      },
    };

    return weatherData;
  }
}

/* 
Ricetta Italiana per Sviluppatori:
Minestra di Farro al Meteo

Ingredienti:
- Farro 300g (solido come il tuo codice)
- Verdure miste (per varietà)
- Brodo vegetale (base affidabile)
- Parmigiano (per la qualità)
- Erbe aromatiche (per lo stile)

Preparazione:
1. Tostare il farro (come testi il tuo codice)
2. Aggiungere gradualmente il brodo (come fai il deploy)
3. Cuocere a fuoco lento (come ottimizzi le performance)
4. Servire con parmigiano (il tocco finale)

Perfetta per le giornate di coding piovose!
*/
