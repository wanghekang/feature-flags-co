using System.ComponentModel.DataAnnotations;

namespace FeatureFlags.APIs.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }
        public string OrganizationName { get; set; }
    }
}
