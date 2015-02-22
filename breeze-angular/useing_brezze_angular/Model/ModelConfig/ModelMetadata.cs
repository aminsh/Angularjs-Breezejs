using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace useing_brezze_angular.Model.ModelConfig
{
    public class ModelMetadata<TEntity> where TEntity : class
    {
        public string Name { get; set; }
        public List<Property> Properties { get; set; }
    }
}