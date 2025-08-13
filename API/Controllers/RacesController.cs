using System.Security.Claims;
using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class RacesController(AppDbContext context) : BaseApiController
    {
        private readonly AppDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult> GetRaces()
        {
            var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(idClaim, out var userId))
                return Unauthorized("Invalid user id claim.");

            var races = await _context.Races
                .Where(r => r.UserId == userId)
                .OrderBy(r => r.Date)
                .Select(r => new
                {
                    r.Id,
                    r.Type,
                    r.Date,
                    r.Location,
                    r.GoalTime,
                    r.TrainingDays
                })
                .ToListAsync();

            return Ok(races);
        }
   
        [HttpPost]
        public async Task<ActionResult> CreateRace(RaceDto raceDto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id claim.");

            var race = new Race
            {
                Id = Guid.NewGuid(),
                UserId = Guid.Parse(userIdClaim),
                Type = raceDto.Type,
                Date = raceDto.Date,
                Location = raceDto.Location,
                GoalTime = raceDto.GoalTime,
                TrainingDays = raceDto.TrainingDays,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Races.Add(race);
            await _context.SaveChangesAsync();

            return Ok(race);
        }
    }
}
