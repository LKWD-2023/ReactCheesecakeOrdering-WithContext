using CheesecakeOrdering.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheesecakeOrdering.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeOrderingController : ControllerBase
    {
        private string _connectionString;

        public CheesecakeOrderingController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("add")]
        [HttpPost]
        public void Add(Order order)
        {
            var repo = new CheesecakeOrderingRepository(_connectionString);
            repo.Add(order);
        }

        [HttpGet]
        [Route("getall")]
        public List<Order> GetAll()
        {
            var repo = new CheesecakeOrderingRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpGet]
        [Route("get")]
        public Order Get(int id)
        {
            var repo = new CheesecakeOrderingRepository(_connectionString);
            return repo.GetOrder(id);
        }

        [HttpGet]
        [Route("getcount")]
        public object GetCount()
        {
            var repo = new CheesecakeOrderingRepository(_connectionString);
            return new { count = repo.GetOrderCount() };
        }

        [HttpGet]
        [Route("EnumTest")]
        public object EnumTest()
        {
            return new { Name = "John Doe", Status = Status.Refused };
        }
    }

    public enum Status
    {
        Pending,
        Confirmed,
        Refused
    }
}
