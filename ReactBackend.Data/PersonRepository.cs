using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactBackend.Data
{
    public class PersonRepository
    {
        private readonly string _connectionString;
        public PersonRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using var context = new ReactBackendDataContext(_connectionString);
            return context.People.ToList();
        }
        public void AddPerson(Person person)
        {
            using var context = new ReactBackendDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public Person GetById(int id)
        {
            using var context = new ReactBackendDataContext(_connectionString);
            return context.People.FirstOrDefault(p => p.Id == id);
        }
        public void Update(Person person)
        {
            using var context = new ReactBackendDataContext(_connectionString);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }
        public void Delete(int id)
        {
            using var context = new ReactBackendDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }
        public void DeleteAll(List<int> ids)
        {
            using var context = new ReactBackendDataContext(_connectionString);
            var peopleToDelete = context.People.Where(p => ids.Contains(p.Id)).ToList();
            context.People.RemoveRange(peopleToDelete);
            context.SaveChanges();
        }


    }
}
