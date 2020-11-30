using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AthenaApi.Data.DataContext
{
    public static class DataContextInitializer
    {
        public static Claim DefaultUserClaim => new Claim("DefaultUserClaim", "DefaultUserAuthorization");
        public static string UserRole = "User";

        public static async Task UpdateContext(IServiceProvider serviceProvider)
        {
            using (var serviceScope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AthenaDataContext>();

                if (context.Database.GetPendingMigrations().Any())
                {
                    await context.Database.MigrateAsync();
                }
            }
        }

        public static async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            var roleCheck = await roleManager.RoleExistsAsync(UserRole);
            if (!roleCheck)
            {
                IdentityRole userRole = new IdentityRole(UserRole);
                await roleManager.CreateAsync(userRole);
            }
        }
    }
}