using FeatureFlags.APIs.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FeatureFlags.APIs.Authentication
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        // https://www.c-sharpcorner.com/article/authentication-and-authorization-in-asp-net-core-web-api-with-json-web-tokens/

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<AccountUserMapping> AccountUserMappings { get; set; }
        public DbSet<UserInvitation> UserInvitations { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectUserMapping> ProjectUserMappings { get; set; }
        public DbSet<Environment> Environments { get; set; }
    }
}
