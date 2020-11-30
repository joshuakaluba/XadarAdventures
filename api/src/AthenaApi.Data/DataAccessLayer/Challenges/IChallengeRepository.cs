using AthenaApi.Data.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AthenaApi.Data.DataAccessLayer.Challenges
{
    public interface IChallengeRepository
    {
        Task CreateChallenge(Challenge challenge);

        Task CompleteChallenge(Challenge challenge, ApplicationUser user);

        Task<CompletedChallenge> DetermingUserCompletedChallenge(Challenge challenge, ApplicationUser user);

        Task<List<CompletedChallenge>> GetUserCompletedChallenges(ApplicationUser user);

        Task<Challenge> FindChallenge(Guid id);

        Task<List<Challenge>> GetAllChallengesByCourse(Course course);
    }
}