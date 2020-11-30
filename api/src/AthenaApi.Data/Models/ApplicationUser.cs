using Microsoft.AspNetCore.Identity;
using System;

namespace AthenaApi.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public bool Active { get; set; } = true;

        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}