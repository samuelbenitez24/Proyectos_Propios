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
public class CajaCorriente extends Cuenta{
    private double sobreGiro;
      public double getSobregiro(){
		return sobreGiro;		
	}
    
    
   
	public CajaCorriente(int id,double pBalance, double pSobreGiro) {
		super(id,pBalance);
		this.sobreGiro = pSobreGiro;
	}

	public void Extraer(double pMonto)throws Exception{
            try{
		if(balance < pMonto){
			double sobregiroNecesario = pMonto - balance;
			
			if(sobreGiro>= sobregiroNecesario){
				balance = -sobregiroNecesario;
				
			}else{
			   throw new Exception ("El monto supera al sobre giro sobreGiro= " +sobreGiro +" sobregiroNecesario = " + sobregiroNecesario ); 
			}	
			
		}else{
			balance = balance -pMonto;			
		}
            }catch(Exception ex){
                throw ex;
                
            }    
	}

}