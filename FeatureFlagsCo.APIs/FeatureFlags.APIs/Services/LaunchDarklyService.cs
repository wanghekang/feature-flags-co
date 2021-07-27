using FeatureFlags.APIs.Authentication;
using FeatureFlags.APIs.Models;
using FeatureFlags.APIs.ViewModels.Environment;
using LaunchDarkly.Client;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.Repositories
{
    public interface ILaunchDarklyService
    {
        bool GetVariation(string ffName);
    }

    public class LaunchDarklyService : ILaunchDarklyService
    {
        private readonly LdClient _ldClient;
        public LaunchDarklyService()
        {
            _ldClient = new LdClient("");
        }

        public bool GetVariation(string ffName)
        {
            User user = User.Builder("UNIQUE IDENTIFIER2")
                  .FirstName("Bob2")
                  .LastName("Loblaw2")
                  .Custom("groups", "beta_testers")
                  .Build();
            bool value = _ldClient.BoolVariation(ffName, user, false);
            return value;
        }
    }

}
