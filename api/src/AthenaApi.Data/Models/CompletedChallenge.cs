using System;

namespace AthenaApi.Data.Models
{
    public class CompletedChallenge : Auditable
    {
        public string ApplicationUserId { get; set; }

        public Guid ChallengeId { get; set; }

        public virtual Challenge Challenge { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}