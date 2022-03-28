using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos.Tablas
{
    [Table("Producto")]
    public class Producto
    {
        public Producto()
        {

        }
        [Key]
        [Column("Id_Producto", Order = 1)]
        public int IdProducto { get; set; }

        [Required, MaxLength(50)]
        [Column("Nombre",Order = 2)]
        public string Nombre { get; set; }

        [Required]
        [Column("Precio", Order = 3)]
        public float Precio { get; set; }

        [Required, MaxLength(100)]
        [Column("Url_Imagen", Order = 4)]
        public string Url_Imagen { get; set; }

        [Required]
        [Column("EsOferta",Order =5)]
        public bool EsOferta { get; set; }

        [Required]
        [Column("EsDestacado", Order = 6)]
        public bool EsDestacado { get; set; }



    }
}
