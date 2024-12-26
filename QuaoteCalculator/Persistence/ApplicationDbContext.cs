using Microsoft.EntityFrameworkCore;
using QuaoteCalculator.Model;

namespace QuaoteCalculator.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) {}
        public DbSet<LoanApplication> LoanApplications { get; set; }
    }
}
