import { WeatherData } from '../Models/WeatherData';
import { FavorCity } from '../Models/FavorCity';

const Weatherapi = 'http://localhost:5297/WeatherForecast/current?';

export const getCurrentWeather = async (city: string, country: string): Promise<WeatherData> => {
    try {
        const response = await fetch(`${Weatherapi}city=${city}&country=${country}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data: WeatherData = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw error;
    }
}

export const getWeatherForCities = async (cities: FavorCity[]): Promise<WeatherData[]> => {
    const weatherDataPromises = cities.map(city => getCurrentWeather(city.city, city.country));
    return Promise.all(weatherDataPromises);
};