

using System.ComponentModel.DataAnnotations;

namespace FeatureFlags.APIs.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string Name { get; set; }
    }
}
