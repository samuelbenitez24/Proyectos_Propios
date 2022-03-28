using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaginaWeb2.Models
{
    public class Producto
    {
        public int ID { get; set; }
        public string Imagen { get; set; }
        public string Nombre { get; set; }
        public float Precio { get; set; }
        public bool EsOferta { get; set; }
        public bool EsDestacado { get; set; }




    }
}