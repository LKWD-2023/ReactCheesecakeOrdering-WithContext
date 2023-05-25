namespace CheesecakeOrdering.Data
{
    public class CheesecakeOrderingRepository
    {
        private string _connectionString;

        public CheesecakeOrderingRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void Add(Order order)
        {
            using var context = new CheesecakeOrderingContext(_connectionString);
            context.Orders.Add(order);
            context.SaveChanges();
        }

        public List<Order> GetAll()
        {
            using var context = new CheesecakeOrderingContext(_connectionString);
            return context.Orders.ToList();
        }

        public Order GetOrder(int id)
        {
            using var context = new CheesecakeOrderingContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }

        public int GetOrderCount()
        {
            using var context = new CheesecakeOrderingContext(_connectionString);
            return context.Orders.Count();
        }
    }
}