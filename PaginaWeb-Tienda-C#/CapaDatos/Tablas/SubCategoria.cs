using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos.Tablas
{
    [Table("SubCategoria")]
    public class SubCategoria
    {
        public SubCategoria() 
        { 
        }

        [Key]
        [Column("Id_SubCategoria", Order = 1)]
        public int IdSubCategoria { get; set; }

        [ForeignKey("CreadoPor")]
        [Column("Fk_Id_Categoria", Order = 2)]
        public int IdCategoria { get; set; }

        [Required, MaxLength(50)]
        [Column("Nombre", Order = 3)]
        public string Nombre { get; set; }

        public virtual Categoria CreadoPor { get; set; }
    }
}
