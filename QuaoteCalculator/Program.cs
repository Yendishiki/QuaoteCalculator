using QuaoteCalculator.Persistence;
using Microsoft.EntityFrameworkCore;
using QuaoteCalculator.Repository.Application;
using QuaoteCalculator.Repository.LoanApplicationService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Get the connection string from configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Register the ApplicationDbContext with dependency injection
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Register the ApplicationRepository
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();

// Register the LoanApplicationService
builder.Services.AddScoped<ILoanApplicationService, LoanApplicationService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:7219") // Allow these origins
              .AllowAnyMethod()   // Allow any HTTP method (GET, POST, PUT, DELETE, etc.)
              .AllowAnyHeader();  // Allow any HTTP header
    });
});

var app = builder.Build();

// Apply the CORS policy globally
app.UseCors("AllowSpecificOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
