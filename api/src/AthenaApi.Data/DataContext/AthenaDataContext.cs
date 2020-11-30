using AthenaApi.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AthenaApi.Data.DataContext
{
    public sealed class AthenaDataContext : IdentityDbContext<ApplicationUser>
    {
        internal DbSet<Course> Courses { get; set; }
        internal DbSet<Challenge> Challenges { get; set; }
        internal DbSet<CompletedChallenge> CompletedChallenges { get; set; }
        internal DbSet<UserEnrollment> UserEnrollments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString
                = $"Server={Configuration.Config.DatabaseHost};" +
                    $"database={Configuration.Config.DatabaseName};" +
                        $"uid={Configuration.Config.DatabaseUser};" +
                            $"pwd={Configuration.Config.DatabasePassword};" +
                                "pooling=true;";

            optionsBuilder.UseMySql(connectionString);

            // To use local SQLite, replace above line with line below, delete all migrations, and recreate migrations
            // optionsBuilder.UseSqlite("Data Source=Athena.db");
        }
    }
}