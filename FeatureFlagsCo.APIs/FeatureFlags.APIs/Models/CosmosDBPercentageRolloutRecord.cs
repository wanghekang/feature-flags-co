using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.Models
{
    public class CosmosDBPercentageRolloutRecord
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        public string Type { get; set; }
        public string FeatureFlagUserKeyId { get; set; }
        public int RuleId { get; set; }
        public int FeatureFlagId { get; set; }
        public int EnvironmentId { get; set; }
        public bool? TrueOfFalse { get; set; }
    }
}
