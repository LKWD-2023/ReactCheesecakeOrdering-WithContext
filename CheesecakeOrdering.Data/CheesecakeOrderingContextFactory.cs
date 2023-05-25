using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace CheesecakeOrdering.Data
{
    public class CheesecakeOrderingContextFactory : IDesignTimeDbContextFactory<CheesecakeOrderingContext>
    {
        public CheesecakeOrderingContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}CheesecakeOrdering.Web"))
               .AddJsonFile("appsettings.json")
               .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new CheesecakeOrderingContext(config.GetConnectionString("ConStr"));
        }
    }
}