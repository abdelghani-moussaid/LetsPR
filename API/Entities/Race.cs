namespace API.Entities;

public class Race
{
    public Guid Id { get; set; } = Guid.NewGuid();

    // Relationships
    public Guid UserId { get; set; }
    public AppUser User { get; set; } = default!;

    // Race details
    public required string Type { get; set; } // e.g., "10K", "Half Marathon"
    public DateTime Date { get; set; }
    public TimeSpan GoalTime { get; set; } // HH:MM:SS
    public int TrainingDays { get; set; } // 1â€“7 days/week

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
