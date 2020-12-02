# Xadar Adventures Api

This is the backend portion of the Xadar Adventures application.

## Getting Started

Before running the application add the following enviroment variables to your machine with your MySQL database credentials.

```

ATHENA_API_DB_HOST=db_name
ATHENA_API_PORT=8080
ATHENA_WEB_PORT=8081
ATHENA_API_DB_NAME=mercury_db
ATHENA_API_DB_USER=db_user
ATHENA_API_DB_PASSWORD=db_password

```

1. Once the enviroment variables are added, ensure dot net core 3.1 SDK is installed. If not download the dot net core from [dot net core sdk](https://dotnet.microsoft.com/download);
2. From the `/src` folder enter the following command `dotnet run --project src/AthenaApi.Web/AthenaApi.Web.csproj`
