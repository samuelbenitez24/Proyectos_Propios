/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.Archivo;

/**
 *
 * @author Samue
 */
import javax.swing.*;

public class Cuenta {

    protected double balance;
    private int idCuenta;
    private Archivo ar;

    public Cuenta(int idCuenta, double pBalance) {
        this.idCuenta = idCuenta;
        balance = pBalance;
    }

    public int getId() {
        return idCuenta;
    }

    public double getBalance() {
        return balance;
    }

    public void setdepositar(double pDeposito) throws Exception{
        try {
            if (pDeposito < 0) {
                throw new Exception("Operacion incorrecta");

            } else {
                balance = balance + pDeposito;
            }
            
            
        } catch (Exception ex) {
            throw ex;
        }
    }

    public void Extraer(double pMonto) throws Exception {

        try {
            if (pMonto > balance) {
                throw new Exception("Saldo Insuficiente Para Realizar La Extraccion");

            } else {
                balance = balance - pMonto;
               

            }
             
        } catch (Exception ex) {
            throw ex;

        }

    }
}
