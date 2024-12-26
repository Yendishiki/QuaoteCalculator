using QuaoteCalculator.Model;
using QuaoteCalculator.Model.Dtos;

namespace QuaoteCalculator.Repository.LoanApplicationService
{
    public interface ILoanApplicationService
    {
        Result SaveApplication(LoanApplicationDto request);
    }
}
