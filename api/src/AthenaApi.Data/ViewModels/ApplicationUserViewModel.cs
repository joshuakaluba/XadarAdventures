using Newtonsoft.Json;

namespace AthenaApi.Data.ViewModels
{
    public class ApplicationUserViewModel
    {
        [JsonProperty("email")]
        public string Email { get; set; }
    }
}