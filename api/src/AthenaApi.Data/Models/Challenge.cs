using System;

namespace AthenaApi.Data.Models
{
    public class Challenge : Auditable
    {
        private bool completed = false;

        public string Name { get; set; }

        public string ShortAnswerQuestion { get; set; }

        public string ShortAnswerSolution { get; set; }

        public string ParagraphText { get; set; }

        public string Description { get; set; }

        public string Latitude { get; set; }

        public string Longitude { get; set; }

        public bool Completed
        {
            get
            {
                return completed;
            }
        }

        public void Complete()
        {
            completed = true;
        }

        public bool IsLocationDependant { get; set; }

        public string MultipleChoiceQuestion { get; set; }

        public string MultipleChoiceOptions { get; set; }

        public int MultipleChoiceSolution { get; set; }

        public ChallengeTypeEnum ChallengeType { get; set; }

        public Guid CourseId { get; set; }

        public virtual Course Course { get; set; }
    }
}