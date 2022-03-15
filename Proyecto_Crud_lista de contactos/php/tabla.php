
<?php 
    //se llama al acrhivo conexion.php para usar sus funciones
	require_once "../php/conexion.php";
	//se guarda la conexion en una variable conexion
	$conexion=conexion();

 ?>
<div class="row">
	<div class="col-sm-12">
	<h2>CRUD</h2>
	    <!--Tabla de personas agregadas-->
		<table id="tablapersona" class="table table-hover table-condensed table-bordered">
		<caption>
			<button class="btn btn-success" data-toggle="modal" data-target="#modalNuevo" id="nuevo">
				Agregar nuevo 
				<span class="glyphicon glyphicon-plus"></span>
			</button>
		</caption>
		<thead>
			<tr>
			    <td>ID</td>
				<td>Nombre</td>
				<td>Apellido</td>
				<td>Email</td>
				<td>Telefono</td>
				<td>Editar</td>
				<td>Eliminar</td>
			</tr>
		</thead>

		<tbody>

			<?php 
                $sql="SELECT id,nombre,apellido,email,telefono FROM t_persona";
				$result=mysqli_query($conexion,$sql);
				/*ciclo while que recupera un conjuntos de datos en filas hasta que arroge null
				La función mysqli_fetch_array se utiliza para recuperar un array 
				en un conjunto de filas*/
				while($mostrar=mysqli_fetch_row($result)){ 

					//almaceno los datos en una variable
					$datos=$mostrar[0]."||".
						   $mostrar[1]."||".
						   $mostrar[2]."||".
						   $mostrar[3]."||".
						   $mostrar[4];
			 ?>

			<tr>
				<!--Imprime en secciones de tablas los datos recuperados-->
			    <td><?php echo $mostrar[0] ?></td>
				<td><?php echo $mostrar[1] ?></td>
				<td><?php echo $mostrar[2] ?></td>
				<td><?php echo $mostrar[3] ?></td>
				<td><?php echo $mostrar[4] ?></td>
				<td>
					<!--boton de modificar-->
					<!--se llama a la funcion agregarform y se manda por parametros la variable $datos que alamacena un array-->
					<button class="btn btn-primary" style="width:100%;" data-toggle="modal" data-target="#modalEdicion" onclick="agregaform('<?php echo $datos ?>')"><i class='far fa-edit'></i></button>
				</td>
				<td>
					<!--boton eliminar-->
					<!--se llama a la funcion preguntarsino donde se va a mandar el dato con valor 0 que seria el id-->
					<button class="btn btn-danger" style="width:100%;" 
					onclick="preguntarSiNo('<?php echo $mostrar[0] ?>')"><i class='fas fa-trash-alt'></i></button>
				</td>
			</tr>
			<?php 
		       }
			?>
		</tbody>
		</table>
	</div>
</div>

<script type="text/javascript">
    /*carga todo el js del documento
	funcion que activa el plugin data table
	codigo para cambio de idioma de data table*/ 
	$(document).ready(function(){
		$('#tablapersona').DataTable({
			"language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        }
		});
	});
</script>
<script type="text/javascript">
$("#nuevo").click(function() {
	$("#formnuevo")[0].reset(); 
});
</script>