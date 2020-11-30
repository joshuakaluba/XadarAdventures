using AthenaApi.Data.Models;

namespace AthenaApi.Data.Services.Authentication
{
    public class UserValidatorService : IUserValidatorService
    {
        //TODO implement true user validation
        //that is more than checking if account is active
        public bool ValidateUser(ApplicationUser user)
        {
            return user.Active;
        }
    }
}