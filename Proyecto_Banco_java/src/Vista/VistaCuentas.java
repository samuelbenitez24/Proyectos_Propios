/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Vista;

import Modelo.Archivo;
import Controlador.Cuenta;
import Controlador.CajaCorriente;
import Controlador.CajaAhorro;
import Controlador.Cliente;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.JOptionPane;

/**
 *
 * @author Samue
 */
public class VistaCuentas extends javax.swing.JFrame {

    private Cliente cliente;
    private CajaAhorro cajaAhorro;
    private Cuenta cuenta;
    private CajaCorriente cajaCorriente;
    private Archivo ar;

    public VistaCuentas(Cliente pcliente) {
        initComponents();
        cliente = pcliente;
        this.mostrasInformacion();

    }

    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jTextField2 = new javax.swing.JTextField();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        txtDepositar = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        txtRetirar = new javax.swing.JTextField();
        jScrollPane1 = new javax.swing.JScrollPane();
        TextArea = new javax.swing.JTextArea();
        ComboCajas = new javax.swing.JComboBox<>();
        Depositar = new javax.swing.JButton();
        Retirar = new javax.swing.JButton();

        jTextField2.setText("jTextField2");

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jLabel1.setText("Deposito/Retiro ");

        jLabel2.setText("Depositar");

        txtDepositar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtDepositarActionPerformed(evt);
            }
        });

        jLabel3.setText("Retirar");

        txtRetirar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtRetirarActionPerformed(evt);
            }
        });

        TextArea.setColumns(20);
        TextArea.setRows(5);
        jScrollPane1.setViewportView(TextArea);

        ComboCajas.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Seleccione Cuenta", "Cuenta Ahorro", "Cuenta Corriente" }));
        ComboCajas.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        ComboCajas.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                ComboCajasActionPerformed(evt);
            }
        });

        Depositar.setText("Depositar");
        Depositar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                DepositarActionPerformed(evt);
            }
        });

        Retirar.setText("Retirar");
        Retirar.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                RetirarActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(ComboCajas, javax.swing.GroupLayout.PREFERRED_SIZE, 215, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 142, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 119, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 69, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(txtRetirar, javax.swing.GroupLayout.PREFERRED_SIZE, 181, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(Retirar, javax.swing.GroupLayout.PREFERRED_SIZE, 83, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(txtDepositar, javax.swing.GroupLayout.PREFERRED_SIZE, 181, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(Depositar)))
                        .addGap(0, 0, Short.MAX_VALUE))))
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 440, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 140, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(ComboCajas, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtDepositar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(Depositar))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 27, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtRetirar, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(Retirar))
                .addGap(24, 24, 24))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void txtRetirarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtRetirarActionPerformed

    }//GEN-LAST:event_txtRetirarActionPerformed

    private void txtDepositarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtDepositarActionPerformed

    }//GEN-LAST:event_txtDepositarActionPerformed

    private void ComboCajasActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_ComboCajasActionPerformed
        try{
        int i = ComboCajas.getSelectedIndex();

        for (Cuenta cu : cliente.getCuenta()) {
            if (i == cu.getId()) {
                cuenta = cu;
            }
            
        }
        TextArea.setText("Monto de la  cuenta "+ cuenta.getId()+" : " + cuenta.getBalance());
        
        }catch(Exception ex){
    
        }

    }//GEN-LAST:event_ComboCajasActionPerformed

    private void DepositarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_DepositarActionPerformed
        try {

            if (cuenta != null) {
                if (cuenta instanceof CajaAhorro) {
                    cajaAhorro = (CajaAhorro) cuenta;
                    cajaAhorro.setdepositar(Double.parseDouble(txtDepositar.getText()));
                    txtDepositar.setText("");
                    //TextArea.setText("Saldo Cuenta Ahorro: $" + cajaAhorro.getBalance());
                    TextArea.setText(TextArea.getText() + "\nSaldo de la cuenta Ahorro: $" + cajaAhorro.getBalance());
                    

                } else if (cuenta instanceof CajaCorriente) {
                    cajaCorriente = (CajaCorriente) cuenta;
                    cajaCorriente.setdepositar(Double.parseDouble(txtDepositar.getText()));
                    txtDepositar.setText("");
                    TextArea.setText(TextArea.getText() + "\nSaldo de la cuenta Corriente: $" + cajaCorriente.getBalance());

                }

            }

        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage());

        }

    }//GEN-LAST:event_DepositarActionPerformed

    private void RetirarActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_RetirarActionPerformed
        try {
            if (cuenta != null) {
                if (cuenta instanceof CajaAhorro) {
                    cajaAhorro = (CajaAhorro) cuenta;
                    cajaAhorro.Extraer(Double.parseDouble(txtRetirar.getText()));
                    txtRetirar.setText("");
                    TextArea.setText(TextArea.getText() + "\nSaldo de la cuenta Ahorro: $" + cajaAhorro.getBalance());

                } else if (cuenta instanceof CajaCorriente) {
                    cajaCorriente = (CajaCorriente) cuenta;
                    cajaCorriente.Extraer(Double.parseDouble(txtRetirar.getText()));
                    txtRetirar.setText("");
                    TextArea.setText(TextArea.getText() + "\nSaldo de la cuenta corriente: $" + cajaCorriente.getBalance());
                    
                }
            }

        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage());

        }
    }//GEN-LAST:event_RetirarActionPerformed
    public void mostrasInformacion() {

        TextArea.append("Nombre cliente: " + cliente.toString());
        TextArea.setEditable(false);

    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JComboBox<String> ComboCajas;
    private javax.swing.JButton Depositar;
    private javax.swing.JButton Retirar;
    public javax.swing.JTextArea TextArea;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JTextField jTextField2;
    public javax.swing.JTextField txtDepositar;
    public javax.swing.JTextField txtRetirar;
    // End of variables declaration//GEN-END:variables
}
