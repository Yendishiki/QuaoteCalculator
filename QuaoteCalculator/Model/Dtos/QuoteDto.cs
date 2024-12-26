namespace QuaoteCalculator.Model.Dtos
{
    public class QuoteDto
    {
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public decimal AmountRequired { get; set; }
        public int Term { get; set; }
        public decimal WeeklyRepayment { get; set; }
        public decimal EstablishmentFee { get; set; }
        public decimal TotalInterest { get; set; }
    }
}
