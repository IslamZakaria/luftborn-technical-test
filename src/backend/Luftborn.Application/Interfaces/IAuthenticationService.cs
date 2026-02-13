using Luftborn.Application.DTOs;

namespace Luftborn.Application.Interfaces;

public interface IAuthenticationService
{
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    Task RevokeTokenAsync(string refreshToken);
}
