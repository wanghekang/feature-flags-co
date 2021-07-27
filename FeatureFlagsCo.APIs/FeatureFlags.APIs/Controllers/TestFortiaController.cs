using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FeatureFlags.APIs.Authentication;
using FeatureFlags.APIs.Models;
using FeatureFlags.APIs.Repositories;
using FeatureFlags.APIs.Services;
using FeatureFlags.APIs.ViewModels.Environment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FeatureFlags.APIs.Controllers
{ 
    [ApiController]
    [Route("[controller]")]
    public class TestFortiaController : ControllerBase
    {
        private readonly IGenericRepository _repository;
        private readonly ILogger<TestFortiaController> _logger;
        private readonly IDistributedCache _redisCache;
        private readonly IFeatureFlagsService _ffService;

        public TestFortiaController(
            ILogger<TestFortiaController> logger, 
            IGenericRepository repository,
            IDistributedCache redisCache,
            IFeatureFlagsService ffService)
        {
            _logger = logger;
            _repository = repository;
            _redisCache = redisCache;
            _ffService = ffService;
        }


        [HttpGet]
        public dynamic Get()
        {
            return FeatureFlagKeyExtension.GenerateEnvironmentKey(25);
        }


        [HttpPost]
        public string Post()
        {
            return FeatureFlagKeyExtension.DecodeBase64("MjAyMTA1MzAxMDEyMzRfXy0xX18tMV9fMjVfX2RlZmF1bHQ=");
        }
    }
}
