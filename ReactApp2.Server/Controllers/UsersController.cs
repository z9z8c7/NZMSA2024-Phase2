using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Models;
using ReactApp2.Server.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactApp2.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            return Ok(users);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUserById(long id)
        {
            var user = await _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<ActionResult<Users>> AddUser([FromBody] Users user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            await _userRepository.AddUser(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        // PUT api/<UsersController>/username
        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateUsername([FromBody] Users user)
        {
            if (user == null || string.IsNullOrEmpty(user.UserName))
            {
                return BadRequest();
            }

            await _userRepository.UpdateUsername(user.UserName);
            return NoContent();
        }

        // PUT api/<UsersController>/password
        [HttpPut("{password}")]
        public async Task<IActionResult> UpdatePassword([FromBody] Users user)
        {
            if (user == null || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest();
            }

            await _userRepository.UpdateUsername(user.Password);
            return NoContent();
        }

        // PUT api/<UsersController>/email
        [HttpPut("{email}")]
        public async Task<IActionResult> UpdateEmail([FromBody] Users user)
        {
            if (user == null || string.IsNullOrEmpty(user.Email))
            {
                return BadRequest();
            }

            await _userRepository.UpdateUsername(user.Email);
            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var userExists = await _userRepository.UserExists(id);
            if (!userExists)
            {
                return NotFound();
            }

            await _userRepository.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
