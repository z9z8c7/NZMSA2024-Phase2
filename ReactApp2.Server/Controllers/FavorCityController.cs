using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Models;
using ReactApp2.Server.Repositories;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavorCityController : ControllerBase
    {
        private readonly IFavorCityRepository _favoriteCityRepository;

        public FavorCityController(IFavorCityRepository favoriteCityRepository)
        {
            _favoriteCityRepository = favoriteCityRepository;
        }

        // GET: api/<FavorCityController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavorCity>>> GetAllFavorCities()
        {
            var cities = await _favoriteCityRepository.GetAllFavorCities();
            return Ok(cities);
        }

        // GET api/<FavorCityController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavorCity>> GetFavorCityById(int id)
        {
            var city = await _favoriteCityRepository.GetFavorCityById(id);
            if (city == null)
                return NotFound();
            return Ok(city);
        }

        // POST api/<FavorCityController>
        [HttpPost]
        public async Task<ActionResult<FavorCity>> AddFavorCity([FromBody] FavorCity newcity)
        {
            if (newcity == null)
                return BadRequest();

            await _favoriteCityRepository.AddFavorCity(newcity);
            return CreatedAtAction(nameof(GetFavorCityById), new {id = newcity.Id}, newcity);
        }


        // DELETE api/<FavorCityController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var cityexists = await _favoriteCityRepository.FavorCityExists(id);
            if (!cityexists)
                return NotFound();

            await _favoriteCityRepository.DeleteFavorCity(id);
            return NoContent();
        }
    }
}
