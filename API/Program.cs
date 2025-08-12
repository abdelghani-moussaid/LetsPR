using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication(); // checks token validity
app.UseAuthorization();  // enforces [Authorize] attributes
// Configure the HTTP request pipeline.
app.MapControllers();

app.Run();
