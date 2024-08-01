export interface WeatherData {
    main: Main;
    weather: Weather[];
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Weather {
    main: string;
    description: string;
    icon: string;
}