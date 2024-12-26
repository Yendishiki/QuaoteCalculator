using QuaoteCalculator.Model;
using QuaoteCalculator.Model.Dtos;
using QuaoteCalculator.Persistence;
using QuaoteCalculator.Repository.Application;

namespace QuaoteCalculator.Repository.LoanApplicationService
{
    public class LoanApplicationService : ILoanApplicationService
    {
        private readonly IApplicationRepository _repository;

        public LoanApplicationService(IApplicationRepository repository)
        {
            _repository = repository;
        }

        public Result SaveApplication(LoanApplicationDto request)
        {
            var existingApplication = _repository.GetByFullNameAndDOB(request.FirstName, request.LastName, request.DateOfBirth);
            if (existingApplication != null)
            {
                return new Result { Success = false, ErrorMessage = "user already exist" };
            }

            var application = new LoanApplication
            {
                AmountRequired = request.AmountRequired,
                Term = request.Term,
                FirstName = request.FirstName,
                LastName = request.LastName,
                DateOfBirth = request.DateOfBirth,
                Mobile = request.Mobile,
                Email = request.Email,
                Title = request.Title
            };
            var redirectUrl = GenerateRedirectUrl(application);
            application.RedirectUrl = redirectUrl;
            _repository.Save(application);
            return new Result { Success = true, RedirectUrl = redirectUrl };
        }
        private string GenerateRedirectUrl(LoanApplication application)
        {
            // URL generation logic (e.g., based on application details)
            return "http://localhost:5173/success";
        }

    }
}
