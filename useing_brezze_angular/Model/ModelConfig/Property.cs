using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;

namespace useing_brezze_angular.Model.ModelConfig
{
    public class Property
    {
        public Property()
        {
            Validators = new List<Validator>();
        }

        public string Name { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public bool IsKey { get; set; }
        public List<Validator> Validators { get; set; }  
    }

    public class PropertyService<TEntity> where TEntity : class 
    {
        public Property Property { get; set; }

        public static PropertyService<TEntity> Create(Property prop)
        {
            var propertyService = new PropertyService<TEntity>
            {
                Property = prop
            };

            return propertyService;
        } 

        public PropertyService<TEntity> Display(string display)
        {
            Property.Title = display;
            return this;
        }

        public PropertyService<TEntity> HasRequired(string errorMessage)
        {
            Property.Validators.Add(new RequiredValidator { ErrorMessage = errorMessage });
            return this;
        }

        public PropertyService<TEntity> EmailAddress(string errorMessage)
        {
            Property.Validators.Add(new EmailAddressValidator { ErrorMessage = errorMessage });
            return this;
        }

        public PropertyService<TEntity> StringLength(
            int minLength,
            int maxLength,
            string errorMessage)
        {

            Property.Validators.Add(new StringLengthValidator
            {
                ErrorMessage = errorMessage,
                MinLength = minLength,
                MaxLength = maxLength
            });

            return this;
        }

        public PropertyService<TEntity> Compare<TProp>(
            Expression<Func<TEntity, TProp>> prop,
            string errorMessage)
        {
            Property.Validators.Add(new CompareValidator
            {
                ErrorMessage = errorMessage,
                OtherPropertyName =MetadataUtility.PropName(prop)
            });

            return this;
        }
    }
}