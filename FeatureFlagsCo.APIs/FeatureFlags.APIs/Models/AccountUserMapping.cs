using System.ComponentModel.DataAnnotations;

namespace FeatureFlags.APIs.Models
{
    public class AccountUserMapping
    {
        [Key]
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
        public string InvitorUserId { get; set; }

    }
}
