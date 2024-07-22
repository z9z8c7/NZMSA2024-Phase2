using ReactApp2.Server.Models;

namespace ReactApp2.Server.Services;

public static class UserCityService
{
    static List<FavorCity> Cities { get; }
    static int nextId = 1;
    static UserCityService()
    {
        Cities = new List<FavorCity>
        {
            new FavorCity{ UserId = 0, Id=0, City="Wellington", Country="nz"}
        };
    }
    public static List<FavorCity> GetAll() => Cities;
    public static FavorCity? Get(int id) => Cities.FirstOrDefault(x => x.Id == id);
    public static void Add(FavorCity city)
    {
        city.Id = Cities.Count > 0 ? Cities.Max(x => x.Id) + 1 : 1;
        Cities.Add(city);
    }
    public static void Update(FavorCity updatedcity)
    {
        var index=Cities.FindIndex(x => x.Id == updatedcity.Id);
        if (index == -1)
            return;
        Cities[index] = updatedcity;
    }
    public static void Delete(int id)
    {
        var city = Get(id);
        if (city is null) 
            return;
        Cities.Remove(city);
    }
}