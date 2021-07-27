using FeatureFlags.APIs.Authentication;
using FeatureFlags.APIs.Repositories;
using FeatureFlags.APIs.ViewModels.Project;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.Services
{
    public interface IProjectUserService
    {
        // Remove all users of a project
        // The currentUser must be the owner/admin of the account, or the owner of the project, must be checked before calling this method
        public Task RemoveAllUsersAsync(int projectId);

        // Remove a specific user of a project
        // The currentUser must be the owner/admin of the account, or owner of the project, must be checked before calling this method
        public Task RemoveUserAsync(int projectId, string userId);

        public bool IsInProjectUserRoles(int projectId, string userId, IEnumerable<ProjectUserRoleEnum> roles);
    }

    public class ProjectUserService : IProjectUserService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGenericRepository _repository;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProjectUserService(ApplicationDbContext context, IGenericRepository repository,
           UserManager<ApplicationUser> userManager)
        {
            _dbContext = context;
            _repository = repository;
            _userManager = userManager;

        }

        public async Task RemoveAllUsersAsync(int projectId)
        {
            var pums = _dbContext.ProjectUserMappings.Where(x => x.ProjectId == projectId).ToList();

            if (pums != null && pums.Count > 0)
            {
                foreach (var item in pums)
                {
                    _dbContext.ProjectUserMappings.Remove(item);
                }
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task RemoveUserAsync(int projectId, string userId)
        {
            var pum = _dbContext.ProjectUserMappings.Where(p => p.ProjectId == projectId && p.UserId == userId).FirstOrDefault();
            if (pum != null)
            {
                _dbContext.ProjectUserMappings.Remove(pum);
            }

            await _dbContext.SaveChangesAsync();
        }

        public bool IsInProjectUserRoles(int projectId, string userId, IEnumerable<ProjectUserRoleEnum> roles) 
        {
            var roleStrings = roles.Select(x => x.ToString());
            var projectUser = _dbContext
               .ProjectUserMappings
               .FirstOrDefault(p => p.ProjectId == projectId && p.UserId == userId && roleStrings.Contains(p.Role));

            return projectUser != null;
        }
    }
}
