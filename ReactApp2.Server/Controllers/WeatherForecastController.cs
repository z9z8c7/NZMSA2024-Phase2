using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ReactApp2.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        public string Apikey;
        public const string WeatherURL = "https://api.openweathermap.org/data/2.5/weather";
        
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, HttpClient httpClient, IConfiguration configuration)
        {
            _logger = logger;
            _httpClient = httpClient;
            Apikey = configuration["WeatherApiKey"];
        }

        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentWeather(string city, string country)
        {
            var url = $"{WeatherURL}?q={city},{country}&appid={Apikey}&units=metric";
            var response = await _httpClient.GetStringAsync(url) ;
            var weatherData = JsonConvert.DeserializeObject<WeatherData>(response);

            return Ok(weatherData);
        }
    }

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
