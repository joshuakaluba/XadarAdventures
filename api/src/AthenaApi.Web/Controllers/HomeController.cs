using AthenaApi.Data.Models;
using AthenaApi.Data.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace AthenaApi.Web.Controllers
{
    public sealed class HomeController : BaseController<HomeController>
    {
        public HomeController(UserManager<ApplicationUser> userManager,
            ILogger<HomeController> logger)
            : base(userManager, logger)
        {
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Download()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}