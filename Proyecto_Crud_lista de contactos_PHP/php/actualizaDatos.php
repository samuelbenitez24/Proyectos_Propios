<?php 
	require_once "conexion.php";
	$conexion=conexion();
	$id=$_POST['id'];
	$nombre=$_POST['nombre'];
	$apellido=$_POST['apellido'];
	$email=$_POST['email'];
	$telefono=$_POST['telefono'];

	$sql="UPDATE t_persona set nombre='$nombre',
								apellido='$apellido',
								email='$email',
								telefono='$telefono'
				where id='$id'";
	echo $result=mysqli_query($conexion,$sql);

 ?>