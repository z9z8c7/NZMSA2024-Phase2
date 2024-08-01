import { WeatherData} from '../Models/WeatherData';

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