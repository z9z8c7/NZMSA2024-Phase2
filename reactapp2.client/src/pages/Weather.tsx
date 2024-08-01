import React, { useEffect, useState } from 'react';
import { WeatherData } from '../Models/WeatherData';
import { getCurrentWeather } from '../api/WeatherService';
import {  Card, Spin, Alert } from 'antd';

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

    if (loading) return <Spin tip={loading} fullscreen />;
    if (error) return <Alert message="Error" type="error" description={error} showIcon />;

    return (
        <Card title="Weather in WGN" className="weather-card" hoverable>
            {weather && (
                <div className="weather-info">
                    <p>Temperature: {weather.main.temp}&#8451;</p>
                    <p>Feels Like: {weather.main.feels_like}&#8451;</p>
                    <p>Min Temperature: {weather.main.temp_min}&#8451;</p>
                    <p>Max Temperature: {weather.main.temp_max}&#8451;</p>
                    <p>Pressure: {weather.main.pressure} hPa</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Main: {weather.weather[0].main}</p>
                    <p>Description: {weather.weather[0].description}</p>
                    <img className="weather-icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                </div>
            )}
        </Card>
    );
};

export default Weather;