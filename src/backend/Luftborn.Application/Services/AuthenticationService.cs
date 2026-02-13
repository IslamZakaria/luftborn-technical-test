using System.Security.Claims;
using Luftborn.Application.DTOs;
using Luftborn.Application.Interfaces;
using Luftborn.Application.Mapping;
using Luftborn.Domain.Entities;
using Luftborn.Domain.Interfaces;
using BCrypt.Net;

namespace Luftborn.Application.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthenticationService(IUnitOfWork unitOfWork, IJwtTokenService jwtTokenService)
    {
        _unitOfWork = unitOfWork;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        var userRepository = _unitOfWork.Repository<User>();
        var existingUsers = await userRepository.GetAllAsync();
        
        if (existingUsers.Any(u => u.Email.Equals(registerDto.Email, StringComparison.OrdinalIgnoreCase)))
            throw new InvalidOperationException("Email already registered");

        var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);
        var user = UserMapper.ToEntity(registerDto, passwordHash);

        var createdUser = await userRepository.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        return await GenerateAuthResponse(createdUser);
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
    {
        var userRepository = _unitOfWork.Repository<User>();
        var allUsers = await userRepository.GetAllAsync();
        
        var user = allUsers.FirstOrDefault(u => 
            u.Email.Equals(loginDto.Email, StringComparison.OrdinalIgnoreCase));

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password");

        return await GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
    {
        var userRepository = _unitOfWork.Repository<User>();
        var allUsers = await userRepository.GetAllAsync();
        
        var user = allUsers.FirstOrDefault(u => u.RefreshToken == refreshToken);

        if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            throw new UnauthorizedAccessException("Invalid or expired refresh token");

        return await GenerateAuthResponse(user);
    }

    public async Task RevokeTokenAsync(string refreshToken)
    {
        var userRepository = _unitOfWork.Repository<User>();
        var allUsers = await userRepository.GetAllAsync();
        
        var user = allUsers.FirstOrDefault(u => u.RefreshToken == refreshToken);

        if (user != null)
        {
            user.RefreshToken = null;
            user.RefreshTokenExpiryTime = null;
            await userRepository.UpdateAsync(user);
            await _unitOfWork.SaveChangesAsync();
        }
    }

    private async Task<AuthResponseDto> GenerateAuthResponse(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.GivenName, user.FirstName),
            new Claim(ClaimTypes.Surname, user.LastName)
        };

        var accessToken = _jwtTokenService.GenerateAccessToken(claims);
        var refreshToken = _jwtTokenService.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        var userRepository = _unitOfWork.Repository<User>();
        await userRepository.UpdateAsync(user);
        await _unitOfWork.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresAt = DateTime.UtcNow.AddHours(1),
            User = UserMapper.ToDto(user)
        };
    }
}
