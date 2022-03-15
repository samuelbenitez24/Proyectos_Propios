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
public class AcumuladorTazaDeInteres {
    private Banco banco;

	public void SetBanco(Banco pBanco) {
		banco = pBanco;

	}

	public void HacerProcesamientoPorLotes() {
		for (Cliente cl : banco.getClientes()) {
			for (Cuenta cu : cl.getCuenta()) {
				if (cu instanceof CajaAhorro) {
					CajaAhorro caja_de_ahora = (CajaAhorro) cu;
					caja_de_ahora.calcularTazaInteres();
				}

			}

		}
	}
    
}
