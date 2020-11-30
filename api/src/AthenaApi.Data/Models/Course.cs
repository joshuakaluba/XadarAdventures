using AthenaApi.Data.Models;
using System;

namespace AthenaApi.Data.Models
{
    public class Course : Auditable
    {
        public Course()
        {
            EnrollmentCode = Id.ToString().Replace("-", "").Substring(0, 8).ToUpper();
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool LocationBased { get; set; } = true;

        public string EnrollmentCode { get; set; }
    }
}