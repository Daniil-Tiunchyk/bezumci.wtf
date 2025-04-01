import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  weatherApiKey: string;

  constructor(private readonly config: ConfigService) {
    this.weatherApiKey = this.config.get<string>('WEATHER_API_KEY');
  }

  async getWeather() {
    const lat = faker.number.float({ min: -90, max: 90, fractionDigits: 2 });
    const lon = faker.number.float({ min: -180, max: 180, fractionDigits: 2 });
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.weatherApiKey}&units=metric`;
    const cityApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${this.weatherApiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
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

    const cityResponse = await fetch(cityApiUrl);
    if (!cityResponse.ok) {
      throw new Error('Failed to fetch city data');
    }
    const cityData = await cityResponse.json();
    if (cityData.length === 0) {
      weatherData.city = 'Unknown';
      weatherData.country = 'Unknown';
      weatherData.coordinates = {
        latitude: lat,
        longitude: lon,
      };
    } else {
      const cityName = cityData[0].name;
      const countryName = cityData[0].country;
      weatherData.city = cityName;
      weatherData.country = countryName;
      weatherData.coordinates = {
        latitude: cityData[0].lat,
        longitude: cityData[0].lon,
      };
    }
    return weatherData;
  }
}
