using CapaDeNegocio;
using PaginaWeb2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.WebPages;

namespace PaginaWeb2.Controllers
{
    public class ContactoController : Controller
    {
        // GET: Contacto
        public ActionResult Contacto()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaCliente(string Nombre,string Correo,string Asunto,string Mensaje) 
        { 
            
            var respuesta = Negocio.Consulta(Nombre, Correo, Asunto, Mensaje);

            if (respuesta == true)
            {
                ViewBag.mensaje = "Se envio el formulario correctamente";

            }
            else 
            {
                ViewBag.mensaje = "Por favor revise campos y intente nuevamente";
            }

            return Json(new { mensaje = ViewBag.mensaje },JsonRequestBehavior.AllowGet);
        }
       

    }
}