using System.Security.Claims;
using API.Data;
using API.DTO;
using API.Entities;
using API.Extensions;
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
        public async Task<ActionResult<IEnumerable<RaceDto>>> GetRaces()
        {
            var idClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(idClaim, out var userId))
                return Unauthorized("Invalid user id claim.");

            var races = await _context.Races
                .Where(r => r.UserId == userId)
                .OrderBy(r => r.Date)
                .Select(r => r.ToDto())
                .ToListAsync();

            return Ok(races);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<RaceDto>> GetRace(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized("Invalid user id claim.");

            var race = await _context.Races
                .FirstOrDefaultAsync(r => r.Id == id && r.UserId == parsedUserId);

            if (race == null)
                return NotFound();

            return Ok(race.ToDto());
        }

        [HttpPost]
        public async Task<ActionResult<RaceDto>> CreateRace(RaceDto raceDto)
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (!Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized("Invalid user id claim.");

            var race = new Race
            {
                Id = Guid.NewGuid(),
                UserId = userId,
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

            return Ok(race.ToDto());
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<RaceDto>> UpdateRace(Guid id, RaceDto raceDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized("Invalid user id claim.");

            var race = await _context.Races
                .FirstOrDefaultAsync(r => r.Id == id && r.UserId == parsedUserId);

            if (race == null)
                return NotFound();

            race.Type = raceDto.Type;
            race.Date = raceDto.Date;
            race.Location = raceDto.Location;
            race.GoalTime = raceDto.GoalTime;
            race.TrainingDays = raceDto.TrainingDays;
            race.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(race.ToDto());
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteRace(Guid id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userId, out var parsedUserId))
                return Unauthorized("Invalid user id claim.");

            var race = await _context.Races
                .FirstOrDefaultAsync(r => r.Id == id && r.UserId == parsedUserId);

            if (race == null)
                return NotFound();

            _context.Races.Remove(race);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
