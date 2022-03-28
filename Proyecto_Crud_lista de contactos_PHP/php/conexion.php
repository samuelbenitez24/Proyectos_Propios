

<?php 
        //FUNCION QUE RETORNA LA CONEXION A LA BD
		function conexion(){
			$servidor="localhost";
			$usuario="root";
			$password="";
			$bd="pruebas";
			//funcion mysqli que reliza para conectarse a un servidor de base de datos
			$conexion=mysqli_connect($servidor,$usuario,$password,$bd);

			return $conexion;
		}

 ?>