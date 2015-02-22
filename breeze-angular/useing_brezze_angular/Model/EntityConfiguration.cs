using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using useing_brezze_angular.Model.ModelConfig;

namespace useing_brezze_angular.Model
{
    public class EntityConfiguration<TEntity> where TEntity : class
    {

        private readonly List<Property> _properties;

        public ModelMetadata<TEntity> Metadata()
        {
            return new ModelMetadata<TEntity>
            {
                Name = GetType().BaseType.GetGenericArguments()[0].Name,
                Properties = _properties
            };
        }

        protected EntityConfiguration()
        {
            _properties = new List<Property>();

            typeof (TEntity).GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .ToList()
                .ForEach(prop => _properties.Add(new Property
                {
                    Name = prop.Name,
                    Title = prop.Name,
                    Type = MetadataUtility.PropType(prop)
                }));
        }

        protected PropertyService<TEntity> Property<TProp>(Expression<Func<TEntity, TProp>> prop)
        {
            var property = _properties.Find(p => p.Name == MetadataUtility.PropName(prop));

            var propertyService = PropertyService<TEntity>.Create(property);
            
            return propertyService;
        }

        protected Association<TEntity> Associate<TProperty>(
            Expression<Func<TEntity, TProperty>> association)
        {
            return new Association<TEntity>() {AssociationProperty = MetadataUtility.PropName(association)};
        }
    }

    public class Association<TEntity>
    {
        public string AssociationProperty { get; set; }
        public string FK { get; set; }

        public void ForegnKey<TProp>(Expression<Func<TEntity, TProp>> prop)
        {
            
        }
    }
}
