using Microsoft.EntityFrameworkCore;
using QuaoteCalculator.Model;
using QuaoteCalculator.Persistence;

namespace QuaoteCalculator.Repository.Application
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public ApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public LoanApplication GetByFullNameAndDOB(string firstName, string lastName, DateTime dateOfBirth)
        {
            return _context.LoanApplications
                .FirstOrDefault(app => app.FirstName == firstName &&
                                       app.LastName == lastName &&
                                       app.DateOfBirth.Date == dateOfBirth.Date);
        }

        public void Save(LoanApplication application)
        {
            _context.LoanApplications.Add(application);
            _context.SaveChanges();  // Save changes to the database
        }

        public List<LoanApplication> AllApplications => _context.LoanApplications.ToList();
    }
}
