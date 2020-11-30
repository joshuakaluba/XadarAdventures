using System;

namespace AthenaApi.Data.Models
{
    public sealed class UserEnrollment
    {
        public Guid Id { get; set; }

        public string ApplicationUserId { get; set; }

        public Guid CourseId { get; set; }

        public string Email
        {
            get
            {
                return ApplicationUser.Email;
            }
        }

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

        public ApplicationUser ApplicationUser { get; set; }

        public Course Course { get; set; }
    }
}