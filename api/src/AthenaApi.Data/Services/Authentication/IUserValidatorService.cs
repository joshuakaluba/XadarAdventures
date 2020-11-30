using AthenaApi.Data.Models;

namespace AthenaApi.Data.Services.Authentication
{
    public interface IUserValidatorService
    {
        bool ValidateUser(ApplicationUser user);
    }
}