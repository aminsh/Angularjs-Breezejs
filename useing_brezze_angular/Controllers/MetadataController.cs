using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using useing_brezze_angular.Model;
using useing_brezze_angular.Model.ModelConfig;

namespace useing_brezze_angular.Controllers
{
    public class MetadataController : ApiController
    {
        [HttpGet]
        public object Metadatas()
        {
            return MetadataUtility.GetAllMetadata();
        }
    }
}
