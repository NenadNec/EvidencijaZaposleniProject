using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace EvidencijaProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet("/api/vreme", Name = "GetWeatherForecast")]
        public async Task<IActionResult> GetWeatherForecast()
        {
            string apiKey = "1ae548272250149d824f4d78ab808830";
            string apiUrl = "https://api.openweathermap.org/data/2.5/forecast";
            int cityId = 524901;

            
            HttpClient httpClient = new HttpClient();

            var parameters = new Dictionary<string, string>
            {
                { "id", cityId.ToString() },
                { "appid", apiKey },
                { "units", "metric" }
            };

            // Kreirajte URL sa parametrima
            string requestUrl = $"{apiUrl}?{string.Join("&", parameters.Select(x => $"{x.Key}={x.Value}"))}";

            // Pošaljite GET zahtev OpenWeatherMap API-ju
            HttpResponseMessage response = await httpClient.GetAsync(requestUrl);

            // Proverite da li je zahtev uspeo
            if (response.IsSuccessStatusCode)
            {
                // Dobijte odgovor kao JSON
                string jsonResponse = await response.Content.ReadAsStringAsync();

                return Content(jsonResponse, "application/json");
            }
            else
            {
                // U slučaju greške pri zahtevu, vratite prazan JSON objekat ili generišite izuzetak
                return BadRequest();
            }
        }




    }
}