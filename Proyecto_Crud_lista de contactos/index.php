<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title>FINAL PRACTICAS II</title>
	<link rel="stylesheet" type="text/css" href="librerias/alertifyjs/css/alertify.css">
	<link rel="stylesheet" type="text/css" href="librerias/alertifyjs/css/themes/default.css">
  <link rel="stylesheet" href="librerias/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="librerias/DataTabl/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
	
</head>
<body>

	<div class="container">
		<div id="tabla"></div>
	</div>

	<!-- Modal para registros nuevos -->
  <div class="modal fade" id="modalNuevo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Agrega nueva persona</h4>
      </div>
      <form id="formnuevo" class="modal-body">
        	<label>Nombre</label>
        	<input type="text" name="" id="nombre" class="form-control input-sm">
        	<label>Apellido</label>
        	<input type="text" name="" id="apellido" class="form-control input-sm">
        	<label>Email</label>
        	<input type="text" name="" id="email" class="form-control input-sm">
        	<label>telefono</label>
        	<input type="text" name="" id="telefono" class="form-control input-sm">
      </form>
      <div class="modal-footer">
        
        <button type="button" class="btn btn-success" data-dismiss="modal" id="guardarnuevo">
        Agregar
        </button>
       
      </div>
    </div>
  </div>
</div>

<!-- Modal para edicion de datos -->

<div class="modal fade" id="modalEdicion" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Actualizar datos</h4>
      </div>
      <div class="modal-body">
      		<input type="text" hidden="" id="idpersona" name="">
        	<label>Nombre</label>
        	<input type="text" name="" id="nombreu" class="form-control input-sm">
        	<label>Apellido</label>
        	<input type="text" name="" id="apellidou" class="form-control input-sm">
        	<label>Email</label>
        	<input type="text" name="" id="emailu" class="form-control input-sm">
        	<label>telefono</label>
        	<input type="text" name="" id="telefonou" class="form-control input-sm">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="actualizadatos" data-dismiss="modal">Actualizar</button>
        
      </div>
    </div>
  </div>
</div>

</body>
</html>

<script src="librerias/jquery-3.2.1.min.js"></script>
<script src="librerias/DataTabl/dataTables.bootstrap.min.js"></script>
<script src="librerias/DataTabl/datatables.min.js"></script>
<script src="js/main.js"></script>
<script src="librerias/bootstrap/js/bootstrap.js"></script>
<script src="librerias/alertifyjs/alertify.js"></script>

<script type="text/javascript">
	$(document).ready(function(){
		$('#tabla').load('php/tabla.php');
	});
</script>

<script type="text/javascript">
    $(document).ready(function(){
        $('#guardarnuevo').click(function(){
          agregardatos();
              
        });


        $('#actualizadatos').click(function(){
          actualizaDatos();
        });
        

    });
</script>