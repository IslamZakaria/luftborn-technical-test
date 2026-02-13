using Luftborn.Application.DTOs;
using Luftborn.Domain.Entities;

namespace Luftborn.Application.Mapping;

public static class UserMapper
{
    public static UserDto ToDto(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName
        };
    }

    public static User ToEntity(RegisterDto registerDto, string passwordHash)
    {
        return new User
        {
            Email = registerDto.Email,
            PasswordHash = passwordHash,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            CreatedAt = DateTime.UtcNow
        };
    }
}
