using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace AthenaApi.Data.ViewModels
{
    public class ChallegeCompletionViewModel
    {
        [JsonProperty("challengeId")]
        public Guid ChallengeId { get; set; }

        [JsonProperty("completed")]
        public bool Completed { get; set; }
    }
}
