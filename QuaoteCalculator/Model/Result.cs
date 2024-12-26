namespace QuaoteCalculator.Model
{
    public class Result
    {
        public bool Success { get; set; }  // Indicates whether the operation was successful or not
        public string RedirectUrl { get; set; }  // The URL to redirect the user to upon success
        public string ErrorMessage { get; set; }  // A message to describe any error, if the operation failed
    }
}
