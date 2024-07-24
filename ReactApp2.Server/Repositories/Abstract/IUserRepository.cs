using ReactApp2.Server.Models;

namespace ReactApp2.Server.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<Users>> GetAllUsers();
        Task<Users> GetUserById(long id);
        Task AddUser(Users user);
        Task UpdateUsername(string username);
        Task UpdatePassword(string password);
        Task UpdateEmail(string email);
        Task DeleteUserAsync(long id);
        Task<bool> UserExists(long id);

    }
}
