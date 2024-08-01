import React, { useEffect, useState } from 'react';
import { WeatherData } from '../Models/WeatherData';
import { getCurrentWeather } from '../api/WeatherService';

const Weather: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await getCurrentWeather('Wellington', 'nz');
                setWeather(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unexpected error occurred');
                }
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="weather">
            <h1>Weather in WGN</h1>
            {weather && (
                <div>
                    <p>Temperature: {weather.main.temp}°„C</p>
                    <p>Feels Like: {weather.main.feels_like}°„C</p>
                    <p>Min Temperature: {weather.main.temp_min}°„C</p>
                    <p>Max Temperature: {weather.main.temp_max}°„C</p>
                    <p>Pressure: {weather.main.pressure} hPa</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Main: {weather.weather[0].main}</p>
                    <p>Description: {weather.weather[0].description}</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                </div>
            )}
        </div>
    );
};

export default Weather;