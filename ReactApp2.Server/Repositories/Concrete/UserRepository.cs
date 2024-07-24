using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Users>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<Users> GetUserById(long id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task AddUser(Users user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUsername(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);
            if (user != null)
            {
                user.UserName = username;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
        }
        public async Task UpdatePassword(string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Password == password);
            if (user != null)
            {
                user.Password = password;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
        }
        public async Task UpdateEmail(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user != null)
            {
                user.Email = email;
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
        }
        public async Task DeleteUserAsync(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<bool> UserExists(long id)
        {
            return await _context.Users.AnyAsync(e => e.Id == id);
        }
    }
}
