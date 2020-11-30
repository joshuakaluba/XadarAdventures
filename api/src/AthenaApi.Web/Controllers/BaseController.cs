﻿using AthenaApi.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AthenaApi.Web.Controllers
{
    public abstract class BaseController<T> : Controller
    {
        protected readonly UserManager<ApplicationUser> UserManager;
        protected ILogger<T> Logger;

        protected BaseController(UserManager<ApplicationUser> userManager, ILogger<T> logger)
        {
            UserManager = userManager;
            Logger = logger;
        }

        private string GetUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return userId;
        }

        protected async Task<ApplicationUser> GetCurrentAuthenticatedUser()
        {
            return await this.GetUser(GetUserId());
        }

        protected async Task<ApplicationUser> GetUser(string userId)
        {
            var user = await UserManager.FindByIdAsync(userId);

            if (user == null)
            {
                throw new System.NullReferenceException("Unable to retrieve user");
            }

            return user;
        }
    }
}