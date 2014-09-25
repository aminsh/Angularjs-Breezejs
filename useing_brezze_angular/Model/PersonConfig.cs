using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls.WebParts;

namespace useing_brezze_angular.Model
{
    public class PersonConfig : EntityConfiguration<Person>
    {
        public PersonConfig()
        {
            Property(p => p.FirstName)
                .Display("نام")
                .HasRequired("نام اجباری است")
                .StringLength(3,5,"نام میبایست بین 3 تا 5 کاراکتر باشد");

            Property(p => p.LastName)
                .Display("نام خانوادگی")
                .HasRequired("نام خانوادگی اجباری است")
                .StringLength(3, 5,
                    "نام خانوادگی میبایست بین 3 تا 5 کاراکتر باشد");

            Property(p => p.Email)
                .Display("پست الکترونیکی")
                .HasRequired("ایمیل اجباری است")
                .EmailAddress("ایمیل معتبر نیست")
                .Compare(p => p.ConfirmEmail, "ایمیل و تایید ایمیل یکسان نیست");

            Property(p => p.Age).Display("سن");


        }

    }
}