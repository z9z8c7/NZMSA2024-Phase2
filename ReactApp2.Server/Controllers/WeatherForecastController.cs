using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReactApp2.Server.Models;

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
}
