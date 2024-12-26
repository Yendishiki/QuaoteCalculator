using QuaoteCalculator.Model;

namespace QuaoteCalculator.Repository.Application
{
    public interface IApplicationRepository
    {
        LoanApplication GetByFullNameAndDOB(string firstName, string lastName, DateTime dateOfBirth);
        void Save(LoanApplication application);
    }
}