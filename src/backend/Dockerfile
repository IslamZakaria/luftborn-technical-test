# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["Luftborn.sln", "./"]
COPY ["Luftborn.Api/Luftborn.Api.csproj", "Luftborn.Api/"]
COPY ["Luftborn.Application/Luftborn.Application.csproj", "Luftborn.Application/"]
COPY ["Luftborn.Domain/Luftborn.Domain.csproj", "Luftborn.Domain/"]
COPY ["Luftborn.Infrastructure/Luftborn.Infrastructure.csproj", "Luftborn.Infrastructure/"]

ENV NUGET_PACKAGES=/root/.nuget/packages

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
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app
EXPOSE 5000

# Run as non-root user
RUN addgroup -g 1000 appgroup && \
    adduser -D -u 1000 -G appgroup appuser && \
    mkdir -p /app/logs && \
    chown -R appuser:appgroup /app

USER appuser

COPY --from=publish --chown=appuser:appgroup /app/publish .
ENTRYPOINT ["dotnet", "Luftborn.Api.dll"]
