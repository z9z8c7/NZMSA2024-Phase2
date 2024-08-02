using Microsoft.EntityFrameworkCore;
using ReactApp2.Server.Models;

namespace ReactApp2.Server.Repositories
{
    public class FavorCityRepository : IFavorCityRepository
    {
        private readonly FavorCityContext _context;

        public FavorCityRepository(FavorCityContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<FavorCity>>GetAllFavorCities()
        {
            return await _context.Favorities.ToListAsync();
        }
        public async Task<FavorCity>GetFavorCityById(int id)
        {
            return await _context.Favorities.FindAsync(id);
        }
        public async Task AddFavorCity(FavorCity city)
        {
            await _context.Favorities.AddAsync(city);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteFavorCity(int id)
        {
            var city = await _context.Favorities.FindAsync(id);
            if (city != null)
            {
                _context.Favorities.Remove(city);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<bool> FavorCityExists(int id)
        {
            return await _context.Favorities.AnyAsync(x => x.Id == id);
        }
    }
}