using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Reflection.Emit;
using System.Web;
using System.Web.Http;
using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Newtonsoft.Json.Linq;

namespace useing_brezze_angular.Controllers
{
    
    public class PersonController : ApiController
    {
        readonly EFContextProvider<AppContext> _contextProvider = new EFContextProvider<AppContext>();
 
        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [AllowAnonymous]
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _contextProvider.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IEnumerable<Person> People()
        {
            return _contextProvider.Context.People;
        }

    }

    public class Person
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First name is required")]
        public string FName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string LName { get; set; }

        //public Guid Id { get; set; }
    }

    public class AppContext : DbContext
    {
        public AppContext()
            : base("Data Source=.;Initial Catalog=usingAngularBreeze;User ID=sa;Password=sa123")
        {}
        public DbSet<Person> People { get; set; }
    }
}