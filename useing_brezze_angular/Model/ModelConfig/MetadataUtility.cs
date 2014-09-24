using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;

namespace useing_brezze_angular.Model.ModelConfig
{
    public static class MetadataUtility
    {
        public static string PropName<TEntity,TProp>(Expression<Func<TEntity, TProp>> prop)
        {
            var member = prop.Body as MemberExpression;
            if (member == null)
                throw new ArgumentException("prop");

            return member.Member.Name;
        }

        public static string PropType(PropertyInfo prop)
        {
            string typeName;

            if (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                typeName = prop.PropertyType.GetGenericArguments()[0].FullName;
            else
                typeName = prop.PropertyType.FullName;

            return typeName;
        }

        public static object GetAllMetadata()
        {
            var modelMetadatas = new List<object>();
            AppDomain.CurrentDomain.GetAssemblies()
               .SelectMany(a => a.GetTypes())
               .Where(t =>
                   t.IsClass &&
                   t.BaseType != null &&
                   t.BaseType.IsGenericType &&
                   t.BaseType.GetGenericTypeDefinition() == typeof(EntityConfiguration<>))
               .ToList()
               .ForEach(t => modelMetadatas.Add(
                   t
                       .GetMethod("Metadata")
                       .Invoke(Activator.CreateInstance(t), new object[] { })
                   ));

            return modelMetadatas;
        }
    }
}