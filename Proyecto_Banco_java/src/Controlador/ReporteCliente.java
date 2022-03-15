/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

/**
 *
 * @author Samue
 */
public class ReporteCliente {
   private Banco banco;

	public ReporteCliente() {
            Banco.CrearBanco();

	}

	public void setBanco(Banco pBanco) {
		banco = pBanco;
	}

	public void GenerarReporte() {
		System.out.println("GENERAR REPORTE");
		System.out.println("---------------");
		for (Cliente cl : banco.getClientes()) {
			for (Cuenta cu : cl.getCuenta()) {
				if (cu instanceof CajaAhorro) {
					System.out.println("El Cliente " + cl.getNombre()
							+ " Saldo en la cuenta caja de ahorro: " + cu.getBalance());
				} else if (cu instanceof CajaCorriente) {
					System.out.println("El Cliente " + cl.getNombre()
							+ " Saldo en la cuenta caja corriente: " + cu.getBalance());
				}
			}

		}

	}
    
}
