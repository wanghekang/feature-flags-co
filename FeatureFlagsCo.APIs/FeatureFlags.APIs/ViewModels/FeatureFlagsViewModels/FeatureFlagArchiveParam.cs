using FeatureFlags.APIs.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.ViewModels.FeatureFlagsViewModels
{
    public class FeatureFlagArchiveParam
    {
        public string FeatureFlagId { get; set; }
        public string FeatureFlgKeyName  { get; set; }
    }

}
