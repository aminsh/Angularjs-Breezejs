using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using useing_brezze_angular.Controllers;

namespace useing_brezze_angular.Model
{
    public class Person : IEntity
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public string ConfirmEmail { get; set; }
        public string Address { get; set; }
    }
}