using AthenaApi.Data.DataContext;
using AthenaApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AthenaApi.Data.DataAccessLayer.Courses
{
    public class CourseRepository : BaseRepository, ICourseRepository
    {
        public async Task CreateCourse(Course course)
        {
            using (db = new AthenaDataContext())
            {
                db.Courses.Add(course);
                await db.SaveChangesAsync();
            }
        }

        public async Task<UserEnrollment> EnrollUserInCourse(ApplicationUser user, Course course)
        {
            using (db = new AthenaDataContext())
            {
                // first ensure user doesnt have an enrollment for this course already.
                // TODO fix with composite key on context

                var currentEnrollment
                    = await db.UserEnrollments
                        .Where(enrollment => enrollment.CourseId == course.Id
                            && enrollment.ApplicationUserId == user.Id).FirstOrDefaultAsync();

                if (currentEnrollment == null)
                {
                    currentEnrollment = new UserEnrollment
                    {
                        ApplicationUserId = user.Id,
                        CourseId = course.Id
                    };

                    db.UserEnrollments.Add(currentEnrollment);
                    await db.SaveChangesAsync();
                }

                return currentEnrollment;
            }
        }

        public async Task<Course> FindCourse(Guid id)
        {
            using (db = new AthenaDataContext())
            {
                var course
                    = await db.Courses
                        .Where(c => c.Id == id)
                            .FirstOrDefaultAsync();

                return course;
            }
        }

        public async Task<Course> FindCourseByEnrollmentCode(string enrollmentCode)
        {
            using (db = new AthenaDataContext())
            {
                var course
                    = await db.Courses
                        .Where(c => c.EnrollmentCode.ToUpper() == enrollmentCode.Trim().ToUpper()).FirstOrDefaultAsync();

                return course;
            }
        }

        public async Task<IEnumerable<Course>> GetAllCourses()
        {
            using (db = new AthenaDataContext())
            {
                var courses
                    = await db.Courses
                        .OrderByDescending(c => c.DateCreated).ToListAsync();

                return courses;
            }
        }

        public async Task<IEnumerable<UserEnrollment>> GetCourseUserEnrollments(Course course)
        {
            using (db = new AthenaDataContext())
            {
                var userEnrollments
                    = await db.UserEnrollments
                        .Where(u=>u.CourseId == course.Id).Include(u=>u.ApplicationUser)
                            .OrderByDescending(c => c.DateCreated).ToListAsync();

                return userEnrollments;
            }
        }

        public async Task<IEnumerable<Course>> GetEnrolledCoursesByUser(ApplicationUser user)
        {
            using (db = new AthenaDataContext())
            {
                var courses
                    = await db.UserEnrollments
                        .Where(s=>s.ApplicationUserId == user.Id)
                            .Include(c=>c.Course).Select(m=>m.Course)
                                .OrderByDescending(c => c.DateCreated)
                                    .ToListAsync();

                return courses;
            }
        }
    }
}