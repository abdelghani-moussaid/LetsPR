using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class UserDto
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Token { get; set; } = string.Empty;
}
