using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RacesController(AppDbContext context) : ControllerBase
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> Get([FromServices] AppDbContext db)
        {
            var count = await db.Races.CountAsync(); // set a breakpoint or log this
            var races = await db.Races
                .OrderBy(r => r.Date)
                .Select(r => new { r.Id, r.Type, r.Date, r.GoalTime, r.TrainingDays })
                .ToListAsync();

            return Ok(races);
        }
    }
}
