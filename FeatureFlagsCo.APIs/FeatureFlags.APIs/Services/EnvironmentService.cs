﻿using Microsoft.EntityFrameworkCore;
using FeatureFlags.APIs.Authentication;
using FeatureFlags.APIs.Models;
using FeatureFlags.APIs.Repositories;
using FeatureFlags.APIs.ViewModels.Project;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.Services
{
    public interface IEnvironmentService
    {
        public Task<IEnumerable<EnvironmentViewModel>> GetEnvs(int accountId, int projectId);

        // Remove all envs of a project
        // The currentUser must be the owner/admin of the account, or the owner/admin of the project, must be checked before calling this method
        public Task RemoveAllEnvsAsync(int projectId);

        // Remove a specific env of a project
        // The currentUser must be the owner/admin of the account, or owner/admin of the project, must be checked before calling this method
        public Task RemoveEnvAsync(int environmentId);

        public Task<EnvironmentViewModel> CreateEnvAsync(EnvironmentViewModel param);

        Task<bool> CheckIfUserHasRightToReadEnvAsync(string userId, int envId);
    }

    public class EnvironmentService : IEnvironmentService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGenericRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;

        public EnvironmentService(ApplicationDbContext context, IGenericRepository repository,
           UserManager<ApplicationUser> userManager)
        {
            _dbContext = context;
            _repository = repository;
            _userManager = userManager;
        }

        public async Task<IEnumerable<EnvironmentViewModel>> GetEnvs(int accountId, int projectId)
        {
            var query = from project in _dbContext.Projects
                        join env in _dbContext.Environments on project.Id equals env.ProjectId
                        where project.AccountId == accountId && project.Id == projectId
                        select new EnvironmentViewModel
                        {
                            ProjectId = project.Id,
                            Id = env.Id,
                            Name = env.Name,
                            Description = env.Description,
                            Secret = env.Secret,
                            MobileSecret = env.MobileSecret
                        };

            return await query.ToListAsync();
        }

        public async Task RemoveAllEnvsAsync(int projectId)
        {
            var envs = _dbContext.Environments.Where(x => x.ProjectId == projectId).ToList();

            if (envs != null && envs.Count > 0)
            {
                foreach (var env in envs)
                {
                    _dbContext.Environments.Remove(env);
                }
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveEnvAsync(int environmentId)
        {
            var env = _dbContext.Environments.Where(p => p.Id == environmentId).FirstOrDefault();
            if (env != null)
            {
                _dbContext.Environments.Remove(env);
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task<EnvironmentViewModel> CreateEnvAsync(EnvironmentViewModel param) 
        {
            var prodEnv = await _repository.CreateAsync<Environment>(new Environment
            {
                ProjectId = param.ProjectId,
                Description = param.Description,
                MobileSecret = System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(System.Guid.NewGuid().ToString())),
                Name = param.Name,
                Secret = FeatureFlagKeyExtension.GenerateEnvironmentKey(param.Id)
            });

            return new EnvironmentViewModel
            {
                Id = prodEnv.Id,
                ProjectId = prodEnv.ProjectId,
                Description = prodEnv.Description,
                MobileSecret = prodEnv.MobileSecret,
                Name = prodEnv.Name,
                Secret = prodEnv.Secret
            };
        }


        public async Task<bool> CheckIfUserHasRightToReadEnvAsync(string userId, int envId)
        {
            var env = await _dbContext.Environments.FirstOrDefaultAsync(p => p.Id == envId);
            var proj = await _dbContext.Projects.FirstOrDefaultAsync(p => p.Id == env.ProjectId);
            return await _dbContext.AccountUserMappings.AnyAsync(p => p.AccountId == proj.AccountId && p.UserId == userId);
        }
    }
}