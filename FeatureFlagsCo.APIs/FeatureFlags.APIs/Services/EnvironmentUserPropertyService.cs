using FeatureFlags.APIs.Authentication;
using FeatureFlags.APIs.Models;
using FeatureFlags.APIs.Services;
using FeatureFlags.APIs.ViewModels.Environment;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.Repositories
{
    public interface IEnvironmentUserPropertyService
    {

        Task<CosmosDBEnvironmentUserProperty> GetCosmosDBEnvironmentUserPropertiesForCRUDAsync(int environmentId);
        Task CreateOrUpdateCosmosDBEnvironmentUserPropertiesForCRUDAsync(CosmosDBEnvironmentUserProperty param);
    }

    public class EnvironmentUserPropertyService : IEnvironmentUserPropertyService
    {
        private readonly ICosmosDbService _cosmosdbService;

        public EnvironmentUserPropertyService(
            ICosmosDbService cosmosdbService)
        {
            _cosmosdbService = cosmosdbService;
        }

        public async Task<CosmosDBEnvironmentUserProperty> GetCosmosDBEnvironmentUserPropertiesForCRUDAsync(int environmentId)
        {
            return await _cosmosdbService.GetCosmosDBEnvironmentUserPropertiesForCRUDAsync(environmentId);
        }

        public async Task CreateOrUpdateCosmosDBEnvironmentUserPropertiesForCRUDAsync(CosmosDBEnvironmentUserProperty param)
        {
            await _cosmosdbService.CreateOrUpdateCosmosDBEnvironmentUserPropertiesForCRUDAsync(param);
        }
    }

}
