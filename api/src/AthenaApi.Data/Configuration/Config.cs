using System;

namespace AthenaApi.Data.Configuration
{
    public static class Config
    {
        internal static string DatabaseHost
           = Environment.GetEnvironmentVariable
               ("ATHENA_API_DB_HOST", target: EnvironmentVariableTarget.Process);

        public static string Port
            = Environment.GetEnvironmentVariable
                ("ATHENA_API_PORT", target: EnvironmentVariableTarget.Process);

        internal static string DatabaseName
            = Environment.GetEnvironmentVariable
                ("ATHENA_API_DB_NAME", target: EnvironmentVariableTarget.Process);

        internal static string DatabaseUser
            = Environment.GetEnvironmentVariable
                ("ATHENA_API_DB_USER", target: EnvironmentVariableTarget.Process);

        internal static string DatabasePassword
            = Environment.GetEnvironmentVariable
                ("ATHENA_API_DB_PASSWORD", target: EnvironmentVariableTarget.Process);
    }
}