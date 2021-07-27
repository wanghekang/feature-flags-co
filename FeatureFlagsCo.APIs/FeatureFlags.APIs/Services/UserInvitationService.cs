using FeatureFlags.APIs.Authentication;
using FeatureFlags.APIs.Models;
using FeatureFlags.APIs.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FeatureFlags.APIs.Services
{
    public interface IUserInvitationService 
    {
        public Task ClearAsync(string userId);
    }

    public class UserInvitationService : IUserInvitationService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGenericRepository _repository;

        public UserInvitationService(
            ApplicationDbContext context, 
            IGenericRepository repository)
        {
            _dbContext = context;
            _repository = repository;
        }

        public async Task ClearAsync(string userId)
        {
            var invitations = _dbContext.UserInvitations.Where(x => x.UserId == userId);
            if (invitations != null && invitations.Count() > 0)
            {
                foreach (var invitation in invitations)
                {
                    _dbContext.UserInvitations.Remove(invitation);
                }
            }

            await _dbContext.SaveChangesAsync();
        }
    }
}
