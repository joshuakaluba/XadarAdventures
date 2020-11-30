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
    public sealed class CoursesController : BaseController<CoursesController>
    {
        private readonly ICourseRepository _courseRepository;

        public CoursesController(UserManager<ApplicationUser> userManager,
            ICourseRepository courseRepository,
            ILogger<CoursesController> logger)
            : base(userManager, logger)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetCourses()
        {
            try
            {
                var courses = await _courseRepository.GetAllCourses();

                return Ok(courses);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetMyEnrolledCourses()
        {
            try
            {
                var user = await GetCurrentAuthenticatedUser();

                var courses = await _courseRepository.GetEnrolledCoursesByUser(user);

                return Ok(courses);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetCourse(Guid id)
        {
            try
            {
                var course = await _courseRepository.FindCourse(id);

                if (course == null)
                {
                    return BadRequest(new ErrorMessage("Unable to find course with provided course id"));
                }

                return Ok(course);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> GetCourseEnrolledStudents(Guid id)
        {
            try
            {
                var course = await _courseRepository.FindCourse(id);

                if (course == null)
                {
                    return BadRequest(new ErrorMessage("Unable to find course with provided course id"));
                }

                var userEnrollments = await _courseRepository.GetCourseUserEnrollments(course);

                return Ok(userEnrollments);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseViewModel courseViewModel)
        {
            try
            {
                var user = await GetCurrentAuthenticatedUser();

                var course = new Course
                {
                    Name = courseViewModel.Name,
                    Description = courseViewModel.Description
                };

                await _courseRepository.CreateCourse(course);

                return Ok(course);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "Trusted")]
        public async Task<IActionResult> EnrollInCourse([FromBody] EnrollmentViewModel enrollmentViewModel)
        {
            try
            {
                var user = await GetCurrentAuthenticatedUser();

                var course
                    = await _courseRepository.FindCourseByEnrollmentCode
                        (enrollmentViewModel.EnrollmentCode);

                if (course == null)
                {
                    return BadRequest(new ErrorMessage("Unable to find course with provided enrollment code"));
                }

                var enrollment = await _courseRepository.EnrollUserInCourse(user, course);

                return Ok(enrollment);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.Message);
                return BadRequest(new ErrorMessage(ex));
            }
        }
    }
}