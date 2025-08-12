using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public MembersController(AppDbContext context)
        {
            _context = context;
        }
        
        // GET: api/members
        [HttpGet]
        public async Task<ActionResult> GetMembers()
        {
            var members = await _context.Users
                .Select(u => new { u.Id, u.Name, u.Email })
                .ToListAsync();

            return Ok(members);
        }

        // GET: api/members/me
        [HttpGet("me")]
        public async Task<ActionResult> GetCurrentMember()
        {
            var email = User.Identity?.Name; // from JWT
            if (email == null) return Unauthorized();

            var user = await _context.Users
                .Where(u => u.Email == email)
                .Select(u => new { u.Id, u.Name, u.Email })
                .FirstOrDefaultAsync();

            return user is null ? NotFound() : Ok(user);
        }
    }
}
