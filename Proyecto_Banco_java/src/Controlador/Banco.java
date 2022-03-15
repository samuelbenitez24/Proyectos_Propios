/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;
import Vista.*;
import Modelo.*;

import java.util.ArrayList;

/**
 *
 * @author Samue
 */
public class Banco {
    private static ArrayList<Cliente> cliente;
    
    
	

	private Banco() {
	
	}
        
        public static void CrearBanco(){
             cliente= new ArrayList<Cliente>();
            Cliente cliente1=new Cliente("samuel","Benitez","2407","samuel34");
            CajaAhorro CajaAhorro1=new CajaAhorro(1,5000, 2);
            CajaCorriente cajaCorriente=new CajaCorriente(2,400,700);
            cliente1.setCuenta(CajaAhorro1);
            cliente1.setCuenta(cajaCorriente);
            Archivo Archi1=new Archivo(cliente1);
            
            Banco.setCliente(cliente1);
            
        }
        
 
	public static void setCliente(Cliente pcliente) {
		cliente.add(pcliente);
	}

	public static ArrayList<Cliente> getClientes() {
		return cliente;
	}
    
}

