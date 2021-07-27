using FeatureFlags.APIs.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.ViewModels.FeatureFlagsViewModels
{
    public class FeatureFlagUsageViewModel
    {
        [JsonProperty("totalUsers")]
        public int TotalUsers { get; set; }
        [JsonProperty("hitUsers")]
        public int HitUsers { get; set; }
        [JsonProperty("chartData")]
        public FeatureFlagUsageChartDataViewModel ChartData { get; set; }

    }


    public class FeatureFlagUsageChartDataViewModel
    {
        [JsonProperty("tables")]
        public List<FeatureFlagUsageChartItemViewModel> Tables { get; set; }
    }

    public class FeatureFlagUsageChartItemViewModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("columns")]
        public List<FeatureFlagUsageChartColumnViewModel> Columns { get; set; }
        [JsonProperty("rows")]
        public List<List<dynamic>> Rows { get; set; }
    }

    public class FeatureFlagUsageChartColumnViewModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
    }

    public enum FeatureFlagUsageChartQueryTimeSpanEnum
    {
        PT30M,
        PT2H,
        P1D,
        P7D,
    }
}
