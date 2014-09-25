using System.Web.Http;

namespace useing_brezze_angular
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "WebApiDefault", 
                routeTemplate: "api/{controller}/{action}",
                defaults: new {action = RouteParameter.Optional});
        }
    }
}