using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.Services
{
    public static class MiscService
    {
        // Generate a password with 12 charactors
        public static string GeneratePassword(string key) 
        {
            string keyOriginText = $"{System.Guid.NewGuid().ToString()}__{key}";
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(keyOriginText);
            return System.Convert.ToBase64String(plainTextBytes).Substring(0, 12);
        }
    }
}
