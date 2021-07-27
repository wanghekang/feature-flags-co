using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.ViewModels.Project
{
    public class ProjectViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<EnvironmentViewModel> Environments { get; set; }
    }
}
