using CapaDatos.Metodos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CapaDeNegocio
{
    public static class Negocio
    {

        public static List<CNProducto> ObtenerProducto()
        {
            try
            {
                var capa_datos = EF.ObtenerProducto();
                return capa_datos.Select(x => new CNProducto
                {
                    ID = x.IdProducto,
                    Nombre = x.Nombre,
                    Imagen = x.Url_Imagen,
                    Precio = x.Precio,
                    EsOferta=x.EsOferta,
                    EsDestacado=x.EsDestacado
                }).ToList();

            }
            catch (Exception ex)
            {
                throw ex;

            }


        }


        public static List<CNCategoria> ObtenerCategorias()
        {

            try
            {
                var capa_datos = EF.ObtenerCategorias();
                return capa_datos.Select(x => new CNCategoria
                {
                    ID = x.IdCategoria,
                    categoria = x.Nombre
                }).ToList();

            }
            catch (Exception ex)
            {
                throw ex;

            }

        }

        public static List<CNSubCategoria> ObtenerSubCategorias ()
        {
            try
            {
                var capa_datos = EF.ObtenerSubCategorias();
                return capa_datos.Select(x => new CNSubCategoria
                {
                    ID = x.IdSubCategoria,
                    Categoria=x.CreadoPor.IdCategoria,
                    Subcategoria = x.Nombre
                }).ToList();

            }
            catch (Exception ex)
            {
                throw ex;

            }


        }
        public static bool Consulta(string Nombre,string Correo,string Asunto, string Mensaje) 
        {
            try 
            {

                var respuesta = ValidacionDatos(Nombre, Correo, Asunto, Mensaje);
                if (respuesta)
                {
                    var capa_datos = EF.Consulta(Nombre, Correo, Asunto, Mensaje);
                    if (capa_datos)
                    {

                        return true;


                    }
                    else
                    {
                        return false;
                    }

                }
                else
                {
                    return false;

                }

                

            }
            catch (Exception) 
            {
                return false;
            }
        }
        public static bool ValidacionDatos(string Nombre,string Correo,string Asunto, string Mensaje) 
        {
            string expresionLetras = "[a-zA-Z]";
            string expresionCorreo = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
            try 
            {
              
                    
                    if (Nombre.Length < 4 || Nombre.Length > 30 || !Regex.IsMatch(Nombre,expresionLetras))
                    {
                        return false;

                    }
                    else if (!Regex.IsMatch(Correo,expresionCorreo))
                    {
                        return false;
                    }
                    else if (Asunto.Length > 20 || !Regex.IsMatch(Asunto, expresionLetras))
                    {
                        return false;
                    }
                    else if (Mensaje.Length < 10 || Mensaje.Length > 100)
                    {
                        return false;
                    }
                    else 
                    {
                        return true;
                    }
                
               
                
            }
            catch (Exception) 
            {
                return false;
            }
        }
    }
}
