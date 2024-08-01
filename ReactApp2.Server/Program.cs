using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ReactApp2.Server.Models;
using ReactApp2.Server.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddHttpClient();

// Allow CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyOrigin(); // For localhost only. Allow all
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Weather API", Version = "v1" });
});

var connection = String.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
}

builder.Services.AddDbContext<UserContext>(options =>
    options.UseSqlServer(connection));

builder.Services.AddScoped<IUserRepository, UserRepository>();

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI( c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Weather API v1");
    });
}

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
