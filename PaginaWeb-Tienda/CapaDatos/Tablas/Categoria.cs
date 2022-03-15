using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos.Tablas
{
    [Table("Categoria")]
    public class Categoria
    {
        public Categoria() 
        { 
        }

        [Key]
        [Column("Id_Categoria", Order = 1)]
        public int IdCategoria { get; set; }

        [Required, MaxLength(50)]
        [Column("Nombre", Order = 2)]
        public string Nombre { get; set; }

    }
}
