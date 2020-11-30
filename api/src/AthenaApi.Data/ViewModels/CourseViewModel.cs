using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace AthenaApi.Data.ViewModels
{
    public class CourseViewModel
    {
        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }
}