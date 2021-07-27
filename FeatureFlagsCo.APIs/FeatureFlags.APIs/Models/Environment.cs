using System.ComponentModel.DataAnnotations;

namespace FeatureFlags.APIs.Models
{
    public class Environment
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProjectId { get; set; }
        public string Description { get; set; }
        public string Secret { get; set; }
        public string MobileSecret { get; set; }
    }
}
