using AthenaApi.Data.DataContext;
using AthenaApi.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AthenaApi.Data.DataAccessLayer.Challenges
{
    public class ChallengeRepository : BaseRepository, IChallengeRepository
    {
        public async Task CompleteChallenge(Challenge challenge, ApplicationUser user)
        {
            using (db = new AthenaDataContext())
            {
                var previouslyCompleted 
                    = await db.CompletedChallenges
                        .Where(c => c.ChallengeId == challenge.Id && c.ApplicationUserId == user.Id)
                            .FirstOrDefaultAsync();

                if (previouslyCompleted != null)
                {
                    return;
                }

                var completedChallenge = new CompletedChallenge
                {
                    ChallengeId = challenge.Id,
                    ApplicationUserId = user.Id
                };

                db.CompletedChallenges.Add(completedChallenge);
                await db.SaveChangesAsync();
            }
        }

        public async Task CreateChallenge(Challenge challenge)
        {
            using (db = new AthenaDataContext())
            {
                db.Challenges.Add(challenge);
                await db.SaveChangesAsync();
            }
        }

        public async Task<Challenge> FindChallenge(Guid id)
        {
            using (db = new AthenaDataContext())
            {
                var course
                    = await db.Challenges
                        .Where(c => c.Id == id)
                            .OrderByDescending(c => c.DateCreated)
                                .FirstOrDefaultAsync();

                return course;
            }
        }

        public async Task<List<Challenge>> GetAllChallengesByCourse(Course course)
        {
            using (db = new AthenaDataContext())
            {
                var challenges
                    = await db.Challenges
                        .Where(challenge => challenge.CourseId == course.Id)
                            .OrderByDescending(c => c.DateCreated)
                                .ToListAsync();

                return challenges;
            }
        }

        public async Task<CompletedChallenge> DetermingUserCompletedChallenge(Challenge challenge, ApplicationUser user)
        {
            using (db = new AthenaDataContext())
            {
                var completedChallenge
                    = await db.CompletedChallenges
                        .Where(c => c.ChallengeId == challenge.Id && c.ApplicationUserId == user.Id)
                            .FirstOrDefaultAsync();

                return completedChallenge;
            }
        }

        public async Task<List<CompletedChallenge>> GetUserCompletedChallenges(ApplicationUser user)
        {
            using (db = new AthenaDataContext())
            {
                var completedChallenges
                    = await db.CompletedChallenges
                        .Where(c =>  c.ApplicationUserId == user.Id)
                            .ToListAsync();

                return completedChallenges;
            }
        }
    }
}