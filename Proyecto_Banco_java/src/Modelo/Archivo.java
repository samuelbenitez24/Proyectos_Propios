/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

import Controlador.*;
import java.io.*;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

public class Archivo {

    private Cliente cliente;
    private String ruta;
    private Cuenta cuenta;
    private CajaAhorro ca;
    private CajaCorriente cc;
    

    public Archivo(Cliente pcliente) {
        cliente=pcliente;

    }

    public void CrearArchivo(double pbalance) throws IOException {
        
        
        
        try{
            
            double balance=pbalance;
        
        File file = new File("C:\\Users\\Samue\\Desktop\\ArchivoProgramacion\\Archivo.txt");
     
                if (!file.exists()) {
                file.createNewFile();
                }
        
        FileWriter fw = new FileWriter(file);
        BufferedWriter bw = new BufferedWriter(fw);
        bw.write(String.valueOf(balance));
        bw.close();
    
        }catch(IOException e){
            e.printStackTrace();
        }
    }
}

