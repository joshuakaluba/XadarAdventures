using AthenaApi.Data.Models;
using AthenaApi.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace AthenaApi.Web.Controllers
{
    public class UsersController : BaseController<UsersController>
    {
        public UsersController(UserManager<ApplicationUser> userManager,
            ILogger<UsersController> logger)
            : base(userManager, logger)
        {
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetUserEmail(string id)
        {
            try
            {
                var user = await GetUser(id);

                var applicationUserViewModel = new ApplicationUserViewModel
                {
                    Email = user.Email
                };

                return Ok(applicationUserViewModel);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }
    }
}