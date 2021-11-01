using Inv.API.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Unity;

namespace Inv.API
{
    public static class WebApiConfig
    {
        public static UnityContainer container = new UnityContainer();
        public static void Register(HttpConfiguration config)
        {
            //dependency configuration


            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            IocConfigurator.RegisterServices(container);
            config.DependencyResolver = new APIResolver(container);

            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
