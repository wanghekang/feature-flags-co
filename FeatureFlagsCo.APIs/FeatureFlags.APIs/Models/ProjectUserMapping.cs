using System.ComponentModel.DataAnnotations;

namespace FeatureFlags.APIs.Models
{
    public class ProjectUserMapping
    {
        [Key]
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
    }
}
