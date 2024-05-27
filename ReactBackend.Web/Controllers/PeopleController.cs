using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactBackend.Data;
using ReactBackend.Web.Models;

namespace ReactBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepository(_connectionString);
            return repo.GetAll();
        }
        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.AddPerson(person);
        }        
        [HttpPost]
        [Route("edit")]
        public void Edit(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        [Route("delete")]
        public void Delete(Person person)
        {
            var repo = new PersonRepository(_connectionString);
            repo.Delete(person.Id);
        }
        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(DeleteAllViewModel vm)
        {
            var repo = new PersonRepository(_connectionString);
            repo.DeleteAll(vm.Ids);

        }

    }
}
