using Microsoft.EntityFrameworkCore;

namespace CheesecakeOrdering.Data
{
    public class CheesecakeOrderingContext : DbContext
    {
        private string _connectionString;

        public CheesecakeOrderingContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Order> Orders { get; set; }
    }
}