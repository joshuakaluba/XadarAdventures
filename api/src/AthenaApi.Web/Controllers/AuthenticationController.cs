using AthenaApi.Data.DataAccessLayer.Authentication;
using AthenaApi.Data.Models;
using AthenaApi.Data.Services.Authentication;
using AthenaApi.Data.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using TokenOptions = AthenaApi.Data.Services.Authentication.TokenOptions;

namespace AthenaApi.Web.Controllers
{
    public sealed class AuthenticationController : BaseController<AuthenticationController>
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TokenOptions _tokenOptions;
        private readonly IUserRepository _userRepository;
        private readonly IUserValidatorService _userValidatorService;
        private readonly ITokenGeneratorService _tokenGeneratorService;

        public AuthenticationController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IUserRepository userRepository,
            IUserValidatorService userValidatorService,
            ITokenGeneratorService tokenGeneratorService,
            IOptions<TokenOptions> tokens,
            ILogger<AuthenticationController> logger)
            : base(userManager, logger)
        {
            _signInManager = signInManager;
            _userRepository = userRepository;
            _tokenOptions = tokens.Value;
            _userValidatorService = userValidatorService;
            _tokenGeneratorService = tokenGeneratorService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ErrorMessage("Incomplete data received"));
                }

                var user = await UserManager.FindByEmailAsync(model.Email);

                if (user == null)
                {
                    return BadRequest(new ErrorMessage("Unable to log in"));
                }

                var isUserValid = _userValidatorService.ValidateUser(user);

                if (!isUserValid)
                {
                    return BadRequest(new ErrorMessage("Your account is no longer valid"));
                }

                var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

                if (!result.Succeeded)
                {
                    return BadRequest(new ErrorMessage("Unable to log in"));
                }

                var token = await _tokenGeneratorService.CreateJwtToken(user, UserManager, _tokenOptions);
                return Ok(token);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ErrorMessage("Incomplete data received"));
                }

                var user = new ApplicationUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                    PhoneNumber = model.PhoneNumber
                };

                var result = await _userRepository.RegisterNewUser(UserManager, user, model.Password);

                if (result.Succeeded == false)
                {
                    return BadRequest(new ErrorMessage("Unable to register"));
                }

                var token = await _tokenGeneratorService.CreateJwtToken(user, UserManager, _tokenOptions);
                return Ok(token);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }
    }
}