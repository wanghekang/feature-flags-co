using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.Models
{
    public class EnvironmentItemViewModel
    {
        public int EnvironmentUserMappingId { get; set; }
        public int EnvironmentId { get; set; }
        public string UserId { get; set; }
        public string UserRoleInEnvironment { get; set; }
        public string EnvironmentName { get; set; }
        public string EnvironmentDescription { get; set; }
        public string EnvironmentSecret { get; set; }
        public string EnvironmentMobileSecret { get; set; }
    }
}
