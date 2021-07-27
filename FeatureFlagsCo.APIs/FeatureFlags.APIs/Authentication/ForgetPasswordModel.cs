using System.ComponentModel.DataAnnotations;

namespace FeatureFlags.APIs.Authentication
{
    public class ForgetPasswordModel
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

    }
}
