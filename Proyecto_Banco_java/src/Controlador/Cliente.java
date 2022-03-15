/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;


import Modelo.Archivo;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author Samue
 */
public class Cliente {
    private String nombre;
    private String apellido;
    private ArrayList<Cuenta>cuenta;
    private String contraseña;
    private String usuario;
    private Archivo ar;

	public Cliente(String pNombre,String pApellido,String pContraseña,String pUsuario) {
		nombre = pNombre;
                apellido=pApellido;
		cuenta = new ArrayList<Cuenta>();
                contraseña=pContraseña;
                usuario=pUsuario;
                

	}

	public String getNombre() {
		return nombre;
	}

	public ArrayList<Cuenta> getCuenta() {
		return cuenta;
	}

	public void setCuenta(Cuenta pcuenta)  {
            
          
		cuenta.add(pcuenta);
                //ar.HacerReporte();
            
			
	}
        public String getApellido() {
        return apellido;
    
        }
    @Override
	public String toString() {
		return nombre+","+apellido;
	}

   
    public String getContraseña() {
        return contraseña;
    }

    public String getUsuario() {
        return usuario;
    }

    public int getCuenta(int i) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

  
    
}
