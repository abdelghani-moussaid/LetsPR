using System;
using API.DTO;
using API.Entities;

namespace API.Extensions;

public static class RaceExtensions
{
    public static RaceDto ToDto(this Race race)
    {
        return new RaceDto
        {
            Id = race.Id,
            Type = race.Type,
            Date = race.Date,
            Location = race.Location,
            GoalTime = race.GoalTime,
            TrainingDays = race.TrainingDays
        };
    }
}
