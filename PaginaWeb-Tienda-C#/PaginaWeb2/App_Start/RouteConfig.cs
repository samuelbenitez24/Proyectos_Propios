using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PaginaWeb2
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Inicio",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Inicio", action = "Inicio", id = UrlParameter.Optional }
            );
             routes.MapRoute(
                name: "Tienda",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Tienda", action = "Tienda", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               name: "Contacto",
               url: "{controller}/{action}/{id}",
               defaults: new { controller = "Contacto", action = "Contacto", id = UrlParameter.Optional }
           );
        }
    }
}
