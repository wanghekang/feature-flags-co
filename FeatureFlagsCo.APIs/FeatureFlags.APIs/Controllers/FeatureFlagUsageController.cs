﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeatureFlags.APIs.Models;
using FeatureFlags.APIs.Repositories;
using FeatureFlags.APIs.Services;
using FeatureFlags.APIs.ViewModels.FeatureFlagsViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FeatureFlags.APIs.Controllers
{
    //[Authorize(Roles = UserRoles.Admin)]
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FeatureFlagUsageController : ControllerBase
    {
        private readonly IAppInsightsService _appInsightsService;
        private readonly ICosmosDbService _cosmosDbService;

        public FeatureFlagUsageController(
            IAppInsightsService appInsightsService,
            ICosmosDbService cosmosDbService)
        {
            _appInsightsService = appInsightsService;
            _cosmosDbService = cosmosDbService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="featureFlagId"></param>
        /// <param name="chartRange">7天=P7D, 24小时=P1D, 2小时=PT2H, 30分钟=PT30M</param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetFeatureFlagUsageData")]
        public async Task<FeatureFlagUsageViewModel> GetFeatureFlagUsageData(string featureFlagId, string chartQueryTimeSpan)
        {
            var returnModel = new FeatureFlagUsageViewModel();
            returnModel.TotalUsers = await _cosmosDbService.GetFeatureFlagTotalUsersAsync(featureFlagId);
            returnModel.HitUsers = await _cosmosDbService.GetFeatureFlagHitUsersAsync(featureFlagId);
            returnModel.ChartData = await _appInsightsService.GetFFUsageChartDataAsync(featureFlagId, chartQueryTimeSpan);
            return returnModel;
        }

    }
}
