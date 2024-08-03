import React, { useEffect, useState } from 'react';
import { WeatherData } from '../Models/WeatherData';
import { getWeatherForCities } from '../api/WeatherService';
import { getAllFavorCities } from '../api/FavorCityService';
import { FavorCity } from '../Models/FavorCity';
import { Card, Spin, Flex, Layout, Alert, Row, Col, Button } from 'antd';
import clear from '../assets/clear.png';
import clouds from '../assets/clouds.png';
import drizzle from '../assets/drizzle.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import thunderstorm from '../assets/thunderstorm.png';
import backgroud from '../assets/background.jpg';
import '../styles/Weather.css';

const { Header, Footer, Content } = Layout;

const Weather: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [favorCities, setFavorCities] = useState<FavorCity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const cities = await getAllFavorCities();
                setFavorCities(cities);
                const weatherData = await getWeatherForCities(cities);
                setWeatherData(weatherData);
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

    if (loading) return <Spin tip="Loading..." style={{ position: 'fixed', top: '50%', left: '50%' }} />;
    if (error) return <Alert message="Error" type="error" description={error} showIcon />;

    const getBackgroundImage = (weather: WeatherData) => {
        const mainWeather = weather.weather[0].main.toLowerCase();
        switch (mainWeather) {
            case 'clear':
                return clear;
            case 'clouds':
                return clouds;
            case 'rain':
                return rain;
            case 'thunderstorm':
                return thunderstorm;
            case 'snow':
                return snow;
            case 'drizzle':
                return drizzle;
            default:
                return clear;
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    const cardStyle = (weather: WeatherData) => ({
        backgroundImage: `url(${getBackgroundImage(weather)})`,
        backgroundSize: 'cover',
        color: 'white',
        textShadow: '1px 1px 2px black',
        marginBottom: '20px',
        width: 300
    });

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
        display: 'flex',
        alignItems: 'center',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        height: '100%',
        width: '100%',
        color: '#fff',
        backgroundImage: `url(${backgroud})`
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
    };

    const layoutStyle = {
        overflow: 'hidden',
        display: 'flex',
        width: '100%',
        height: '100vh',
    };

    return (
        <Flex wrap>
            <Layout style={layoutStyle}> 
                <Header style={headerStyle}>
                    <Button onClick={toggleDarkMode}>
                        {isDarkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
                    </Button>
                </Header>
                <Content style={contentStyle}> 
                        <Row gutter={[250, 24]}>
                            {favorCities.map((city, index) => (
                                <Col key={city.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                                    <Card
                                        title={`Weather in ${city.city}`}
                                        className="weather-card"
                                        hoverable
                                        style={cardStyle(weatherData[index])}
                                    >
                                        {weatherData[index] && (
                                            <div className="weather-info">
                                                <p>Temperature: {weatherData[index].main.temp}&#8451;</p>
                                                <p>Feels Like: {weatherData[index].main.feels_like}&#8451;</p>
                                                <p>Min Temperature: {weatherData[index].main.temp_min}&#8451;</p>
                                                <p>Max Temperature: {weatherData[index].main.temp_max}&#8451;</p>
                                                <p>Pressure: {weatherData[index].main.pressure} hPa</p>
                                                <p>Humidity: {weatherData[index].main.humidity}%</p>
                                                <p>Main: {weatherData[index].weather[0].main}</p>
                                                <p>Description: {weatherData[index].weather[0].description}</p>
                                                <img
                                                    className="weather-icon"
                                                    src={`http://openweathermap.org/img/wn/${weatherData[index].weather[0].icon}.png`}
                                                    alt="Weather Icon"
                                                />
                                            </div>
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                </Content>
                <Footer style={footerStyle}></Footer>
            </Layout>
        </Flex>
    );
};

export default Weather;
