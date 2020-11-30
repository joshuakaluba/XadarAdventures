using AthenaApi.Data.Models;
using Newtonsoft.Json;
using System;

namespace AthenaApi.Data.ViewModels
{
    public class ChallengeViewModel
    {
        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("latitude")]
        public string Latitude { get; set; }

        [JsonProperty("longitude")]
        public string Longitude { get; set; }        

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("shortAnswerQuestion")]
        public string ShortAnswerQuestion { get; set; }

        [JsonProperty("shortAnswerSolution")]
        public string ShortAnswerSolution { get; set; }

        [JsonProperty("paragraphText")]
        public string ParagraphText { get; set; }
        
        [JsonProperty("multipleChoiceQuestion")]
        public string MultipleChoiceQuestion { get; set; }

        [JsonProperty("isLocationDependant")]
        public bool IsLocationDependant { get; set; }

        [JsonProperty("multipleChoiceOptions")]
        public string MultipleChoiceOptions { get; set; }

        [JsonProperty("multipleChoiceSolution")]
        public int MultipleChoiceSolution { get; set; }

        [JsonProperty("challengeType")]
        public ChallengeTypeEnum ChallengeType { get; set; }
		
		[JsonProperty("courseId")]
        public Guid CourseId { get; set; }

    }
}