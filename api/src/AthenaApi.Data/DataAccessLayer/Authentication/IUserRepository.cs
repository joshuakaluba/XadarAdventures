using AthenaApi.Data.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace AthenaApi.Data.DataAccessLayer.Authentication
{
    public interface IUserRepository
    {
        Task<IdentityResult> RegisterNewUser(UserManager<ApplicationUser> userManager, ApplicationUser user, string password);

        Task<IdentityResult> UpdateUser(UserManager<ApplicationUser> userManager, ApplicationUser user);
    }
}