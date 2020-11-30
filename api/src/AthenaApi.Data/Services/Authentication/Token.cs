using Newtonsoft.Json;

namespace AthenaApi.Data.Services.Authentication
{
    public class Token
    {
        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("expiryDate")]
        public System.DateTime ExpiryDate { get; set; }
    }
}