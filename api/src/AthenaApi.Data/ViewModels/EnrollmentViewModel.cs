using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace AthenaApi.Data.ViewModels
{
    public class EnrollmentViewModel
    {
        [Required]
        [JsonProperty("enrollmentCode")]
        public string EnrollmentCode { get; set; }
    }
}