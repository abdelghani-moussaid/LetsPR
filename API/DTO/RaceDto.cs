using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class RaceDto
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    [StringLength(50, ErrorMessage = "Type cannot be longer than 50 characters.")]
    public string Type { get; set; } = string.Empty;
    
    [Required]
    [DataType(DataType.Date)]
    public DateTime Date { get; set; }
    
    [Required]
    [StringLength(100, ErrorMessage = "Location cannot be longer than 100 characters.")]
    public string Location { get; set; } = string.Empty;

    [DataType(DataType.Time)]
    public TimeSpan? GoalTime { get; set; }

    [Range(1, 7, ErrorMessage = "Training days must be between 1 and 7.")]
    public int TrainingDays { get; set; }
}
