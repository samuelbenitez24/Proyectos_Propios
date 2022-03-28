<?php 

	require_once "conexion.php";
	$conexion=conexion();
	//varibles con datos almacenados mediante metodo post
	$nombre=$_POST['nombre'];
	$apellido=$_POST['apellido'];
	$email=$_POST['email'];
	$telefono=$_POST['telefono'];
    
	//sentencia sql para insertar datos
	$sql="INSERT into t_persona (nombre,apellido,email,telefono)
								values ('$nombre','$apellido','$email','$telefono')";
	//La función mysqli_query se usa para ejecutar consultas a la bd
	echo $result=mysqli_query($conexion,$sql);

 ?>