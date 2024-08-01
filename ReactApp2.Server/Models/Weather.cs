namespace ReactApp2.Server.Models
{
    public class WeatherData
    {
        public Main Main { get; set; }
        public IEnumerable<Weather> Weather { get; set; }
    }

    public class Main
    {
        public float Temp { get; set; }
        public float Feels_like { get; set; }
        public float Temp_min { get; set; }
        public float Temp_max { get; set; }
        public int Pressure { get; set; }
        public int Humidity { get; set; }
    }
    public class Weather
    {
        public string Main { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
    }
}
