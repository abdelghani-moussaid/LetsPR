using System;

namespace API.DTO;

public class RaceDto
{
    public required string Type { get; set; }
    public DateTime Date { get; set; }
    public required string Location { get; set; }
    public TimeSpan GoalTime { get; set; }
    public int TrainingDays { get; set; }
}
