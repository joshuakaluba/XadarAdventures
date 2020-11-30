using AthenaApi.Data.DataAccessLayer.Challenges;
using AthenaApi.Data.DataAccessLayer.Courses;
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
    public sealed class ChallengesController : BaseController<ChallengesController>
    {
        private readonly IChallengeRepository _challengeRepository;
        private readonly ICourseRepository _courseRepository;

        public ChallengesController(UserManager<ApplicationUser> userManager,
            IChallengeRepository challengeRepository,
            ICourseRepository courseRepository,
            ILogger<ChallengesController> logger)
            : base(userManager, logger)
        {
            _challengeRepository = challengeRepository;
            _courseRepository = courseRepository;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> CreateChallenge([FromBody] ChallengeViewModel challengeViewModel)
        {
            try
            {
                var course = await _courseRepository.FindCourse(challengeViewModel.CourseId);

                if (course == null)
                {
                    return BadRequest("Unable to find course");
                }

                var challenge = new Challenge
                {
                    CourseId = challengeViewModel.CourseId,
                    Description = challengeViewModel.Description,
                    Latitude = challengeViewModel.Latitude,
                    IsLocationDependant = challengeViewModel.IsLocationDependant,
                    Longitude = challengeViewModel.Longitude,
                    Name = challengeViewModel.Name,
                    ShortAnswerQuestion = challengeViewModel.ShortAnswerQuestion,
                    ShortAnswerSolution = challengeViewModel.ShortAnswerSolution,
                    ChallengeType = challengeViewModel.ChallengeType,
                    MultipleChoiceSolution = challengeViewModel.MultipleChoiceSolution,
                    MultipleChoiceOptions = challengeViewModel.MultipleChoiceOptions,
                    MultipleChoiceQuestion = challengeViewModel.MultipleChoiceQuestion,
                    ParagraphText = challengeViewModel.ParagraphText
                };

                await _challengeRepository.CreateChallenge(challenge);

                return Ok(challenge);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> CompleteChallenge([FromBody] ChallegeCompletionViewModel completedChallengeViewModel)
        {
            try
            {
                var challenge = await _challengeRepository.FindChallenge(completedChallengeViewModel.ChallengeId);

                if (challenge == null)
                {
                    return BadRequest("Unable to find challenge");
                }

                var user = await GetCurrentAuthenticatedUser();

                if (completedChallengeViewModel.Completed)
                {
                    await _challengeRepository.CompleteChallenge(challenge, user);
                }

                return Ok(completedChallengeViewModel);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetChallenge(Guid id)
        {
            try
            {
                var challenge = await _challengeRepository.FindChallenge(id);

                return Ok(challenge);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetAllChallengesByCourse(Guid id)
        {
            try
            {
                var course = await _courseRepository.FindCourse(id);

                if (course == null)
                {
                    return BadRequest("Unable to find course");
                }

                var challenges = await _challengeRepository.GetAllChallengesByCourse(course);

                var user = await GetCurrentAuthenticatedUser();

                var userCompletedChallenges = await _challengeRepository.GetUserCompletedChallenges(user);

                for (var i = 0; i < challenges.Count; i++)
                {
                    foreach (var completedChallenge in userCompletedChallenges)
                    {
                        if (challenges[i].Id == completedChallenge.ChallengeId)
                        {
                            challenges[i].Complete();
                            break;
                        }
                    }
                }

                return Ok(challenges);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetUserCourseChallenges(Guid courseId, string userId)
        {
            try
            {
                var course = await _courseRepository.FindCourse(courseId);

                if (course == null)
                {
                    return BadRequest("Unable to find course");
                }

                var challenges = await _challengeRepository.GetAllChallengesByCourse(course);

                var user = await GetUser(userId);

                var userCompletedChallenges = await _challengeRepository.GetUserCompletedChallenges(user);

                for (var i = 0; i < challenges.Count; i++)
                {
                    foreach (var completedChallenge in userCompletedChallenges)
                    {
                        if (challenges[i].Id == completedChallenge.ChallengeId)
                        {
                            challenges[i].Complete();
                            break;
                        }
                    }
                }

                return Ok(challenges);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetUserCompletedChallenges()
        {
            try
            {
                var user = await GetCurrentAuthenticatedUser();

                var userCompletedChallenges = await _challengeRepository.GetUserCompletedChallenges(user);

                return Ok(userCompletedChallenges);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetChallengeCompletion(Guid id)
        {
            try
            {
                var challenge = await _challengeRepository.FindChallenge(id);

                if (challenge == null)
                {
                    return BadRequest("Unable to find challenge");
                }

                var user = await GetCurrentAuthenticatedUser();

                var completedChallenge = await _challengeRepository.DetermingUserCompletedChallenge(challenge, user);

                var completedChallangeViewModel = new ChallegeCompletionViewModel
                {
                    ChallengeId = challenge.Id,
                    Completed = completedChallenge != null
                };

                return Ok(completedChallangeViewModel);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }
    }
}