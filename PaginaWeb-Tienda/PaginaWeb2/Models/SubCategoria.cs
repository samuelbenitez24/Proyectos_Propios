using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PaginaWeb2.Models
{
    public class SubCategoria
    {
        public int ID { get; set; }
        public string Subcategoria { get; set; }

        public int Categoria { get; set; }
    }
}