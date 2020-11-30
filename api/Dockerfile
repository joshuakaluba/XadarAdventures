FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./src/AthenaApi.Web/AthenaApi.Web.csproj ./AthenaApi.Web/AthenaApi.Web.csproj
COPY ./src/AthenaApi.Data/AthenaApi.Data.csproj ./AthenaApi.Data/AthenaApi.Data.csproj
RUN dotnet restore ./AthenaApi.Web/AthenaApi.Web.csproj

# Copy everything else and build
COPY ./src ./
RUN dotnet publish ./AthenaApi.Web/AthenaApi.Web.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "AthenaApi.Web.dll"]