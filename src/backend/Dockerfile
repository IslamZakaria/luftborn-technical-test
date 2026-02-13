# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["Luftborn.sln", "./"]
COPY ["Luftborn.Api/Luftborn.Api.csproj", "Luftborn.Api/"]
COPY ["Luftborn.Application/Luftborn.Application.csproj", "Luftborn.Application/"]
COPY ["Luftborn.Domain/Luftborn.Domain.csproj", "Luftborn.Domain/"]
COPY ["Luftborn.Infrastructure/Luftborn.Infrastructure.csproj", "Luftborn.Infrastructure/"]

# Restore dependencies
RUN dotnet restore "Luftborn.Api/Luftborn.Api.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/Luftborn.Api"
RUN dotnet build "Luftborn.Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "Luftborn.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 5000

# Create logs directory
RUN mkdir -p /app/logs

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Luftborn.Api.dll"]
