using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuaoteCalculator.Model.Dtos;
using QuaoteCalculator.Repository.LoanApplicationService;

namespace QuaoteCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanApplicationController : ControllerBase
    {
        private readonly ILoanApplicationService _loanApplicationService;

        public LoanApplicationController(ILoanApplicationService loanApplicationService)
        {
            _loanApplicationService = loanApplicationService;
        }
        [HttpPost("apply")]
        public IActionResult SubmitApplication([FromBody] LoanApplicationDto request)
        {
            var result = _loanApplicationService.SaveApplication(request);
            if (result.Success)
                return Ok(new { RedirectUrl = result.RedirectUrl });

            return BadRequest(result.ErrorMessage);
        }

        [HttpPost("calculate")]
        public IActionResult CalculateQuote([FromBody] LoanApplicationDto loanApplication)
        {
            decimal weeklyRepayment = 0;
            decimal establishmentFee = 300.00m; // Example fixed establishment fee
            decimal totalInterest = 0;

            // Handle product-specific logic
            switch (loanApplication.Product)
            {
                case "ProductA":
                    // ProductA is interest-free
                    totalInterest = 0; // No interest for ProductA
                    weeklyRepayment = (loanApplication.AmountRequired / loanApplication.Term) / 4;
                    break;

                case "ProductB":
                    // ProductB has first 2 months interest-free, and minimum term is 6 months
                    if (loanApplication.Term < 6)
                    {
                        return BadRequest("ProductB requires a minimum term of 6 months.");
                    }
                    totalInterest = loanApplication.AmountRequired * 0.1m; // Apply interest after 2 months
                    weeklyRepayment = ((loanApplication.AmountRequired + totalInterest) / loanApplication.Term) / 4;
                    break;

                case "ProductC":
                    // ProductC has no interest-free period
                    totalInterest = loanApplication.AmountRequired * 0.15m; // Example interest rate of 15%
                    weeklyRepayment = ((loanApplication.AmountRequired + totalInterest) / loanApplication.Term) / 4;
                    break;

                default:
                    return BadRequest("Invalid product selected.");
            }

            // Create the quote response
            var quote = new QuoteDto
            {
                Name = loanApplication.FirstName + " " + loanApplication.LastName,
                Mobile = loanApplication.Mobile,
                Email = loanApplication.Email,
                AmountRequired = loanApplication.AmountRequired,
                Term = loanApplication.Term,
                WeeklyRepayment = Math.Round(weeklyRepayment, 2),
                EstablishmentFee = establishmentFee,
                TotalInterest = Math.Round(totalInterest, 2),
            };

            return Ok(quote);
        }

        [HttpGet("Test")]
        public IActionResult SubmitApplication()
        {
            return Ok("Succcess");
        }
    }
}
