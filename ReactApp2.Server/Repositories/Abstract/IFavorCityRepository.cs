using ReactApp2.Server.Models;

namespace ReactApp2.Server.Repositories
{
    public interface IFavorCityRepository
    {
        Task<IEnumerable<FavorCity>> GetAllFavorCities();
        Task<FavorCity> GetFavorCityById(int id);
        Task AddFavorCity(FavorCity city);
        Task DeleteFavorCity(int id);
        Task<bool> FavorCityExists(int id);
    }
}
