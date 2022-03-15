using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDeNegocio
{
    public class CNProducto
    {
        public int ID { get; set; }
        public string Imagen { get; set; }
        public string Nombre { get; set; }
        public float Precio { get; set; }
        public bool EsOferta { get; set; }
        public bool EsDestacado { get; set; }
    }
}
