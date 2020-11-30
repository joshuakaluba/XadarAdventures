using AthenaApi.Data.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using TokenOptions = AthenaApi.Data.Services.Authentication.TokenOptions;

namespace AthenaApi.Data.Services.Authentication
{
    public interface ITokenGeneratorService
    {
        Task<Token> CreateJwtToken(ApplicationUser user, UserManager<ApplicationUser> userManager, TokenOptions tokenOptions);
    }
}