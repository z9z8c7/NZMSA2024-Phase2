using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Models;
using ReactApp2.Server.Services;

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavorCityController : ControllerBase
    {
        // GET: api/<FavorCityController>
        [HttpGet]
        public ActionResult<List<FavorCity>> GetAll() =>
            UserCityService.GetAll();

        // GET api/<FavorCityController>/5
        [HttpGet("{id}")]
        public ActionResult<FavorCity> Get(int id)
        {
            var city = UserCityService.Get(id);
            if (city == null)
                return NotFound();
            return city;
        }

        // POST api/<FavorCityController>
        [HttpPost]
        public IActionResult Post([FromBody] FavorCity newcity)
        {
            UserCityService.Add(newcity);
            return CreatedAtAction(nameof(Get), new { userid = newcity.UserId }, newcity);
        }

        // PUT api/<FavorCityController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] FavorCity city)
        {
            if (id != city.Id)
                return BadRequest();
            var existingcity = UserCityService.Get(id);
            if (existingcity is null)
                return NotFound();
            UserCityService.Update(city);
            return NoContent();
        }

        // DELETE api/<FavorCityController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var city = UserCityService.Get(id);
            if(city is null)
                return NotFound();
            UserCityService.Delete(id);
            return NoContent();
        }
    }
}
