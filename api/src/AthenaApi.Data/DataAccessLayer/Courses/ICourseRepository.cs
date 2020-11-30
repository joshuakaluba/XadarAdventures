using AthenaApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AthenaApi.Data.DataAccessLayer.Courses
{
    public interface ICourseRepository
    {
        Task CreateCourse(Course course);

        Task<UserEnrollment> EnrollUserInCourse(ApplicationUser user, Course course);

        Task<IEnumerable<UserEnrollment>> GetCourseUserEnrollments(Course course);

        Task<Course> FindCourse(Guid id);

        Task<Course> FindCourseByEnrollmentCode(string enrollmentCode);

        Task<IEnumerable<Course>> GetAllCourses();

        Task<IEnumerable<Course>> GetEnrolledCoursesByUser(ApplicationUser user);
    }
}