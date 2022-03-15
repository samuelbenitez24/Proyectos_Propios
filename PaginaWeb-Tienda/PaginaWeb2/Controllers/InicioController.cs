using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;
using System.Web.UI.WebControls;
using CapaDeNegocio;
using PaginaWeb2.Models;

namespace PaginaWeb2.Controllers
{
    public class InicioController : Controller
    {
        // GET: Inicio
        public ActionResult Inicio()
        {


            var respuesta = Negocio.ObtenerProducto();
            var respuestaCate = Negocio.ObtenerCategorias();
            var respuestaSub = Negocio.ObtenerSubCategorias();

            var miModelo = new InicioModel();
            miModelo.Producto = respuesta.Select(x => new Producto
            {
                ID = x.ID,
                Nombre = x.Nombre,
                Imagen = x.Imagen,
                Precio = x.Precio,
                EsOferta=x.EsOferta,
                EsDestacado=x.EsDestacado
            }).ToList();
            miModelo.Categoria = respuestaCate.Select(x => new Categoria
            {
                ID = x.ID,
               categoria = x.categoria
            }).ToList();
            
            miModelo.SubCategoria = respuestaSub.Select(x => new SubCategoria
            {
                ID=x.ID,
                Categoria=x.Categoria,
                Subcategoria=x.Subcategoria
            }).ToList();
            
            return View(miModelo);

        }
    }
}