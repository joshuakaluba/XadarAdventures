using Newtonsoft.Json;
using System;

namespace AthenaApi.Data.Models
{
    public class ErrorMessage
    {
        public ErrorMessage(string message)
        {
            Message = message;
        }

        public ErrorMessage(Exception exception)
        {
            Message = exception.Message;
        }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}