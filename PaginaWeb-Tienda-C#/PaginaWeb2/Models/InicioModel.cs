using CapaDeNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaginaWeb2.Models
{
    public class InicioModel
    {
        public List<Producto> Producto { get; set; }

        public List<Categoria> Categoria  { get; set; }

        public List<SubCategoria> SubCategoria { get; set; }

       
    }
}