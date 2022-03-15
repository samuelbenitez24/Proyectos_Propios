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
public class CajaAhorro extends Cuenta{
    private double tazaInteres;

	public CajaAhorro(int id,double pBalance, double pTazaInteres) {
		super(id,pBalance);
		tazaInteres = pTazaInteres;

	}

	public void calcularTazaInteres() {
		balance = balance + balance * (tazaInteres / 100);
	}
        
    @Override
        	public double getBalance() {
		return balance;
	}
    

}
