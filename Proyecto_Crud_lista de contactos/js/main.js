
//FUNCION PARA AGREGAR NUEVAS PERSONAS
function agregardatos(){

	var nombre = $("#nombre").val();
    var apellido= $("#apellido").val();
    var email= $("#email").val();
    var telefono = $("#telefono").val();
	$.ajax({
		type:"POST",
		url:"php/agregarDatos.php",
		data:{nombre:nombre,apellido:apellido,email:email,telefono:telefono},
		success:function(r){
			if(r==1){
				$("#tabla").load('php/tabla.php');
				alertify.success("agregado con exito :)");
			}else{
				alertify.error("Fallo el servidor :(");
			}
		}
	});

}

function agregaform(datos){

	//ALMACENAMOS DATOS EN UNA VARIABLE COMO UN ARRAY
	var d=datos.split('||');

	$('#idpersona').val(d[0]);
	$('#nombreu').val(d[1]);
	$('#apellidou').val(d[2]);
	$('#emailu').val(d[3]);
	$('#telefonou').val(d[4]);
	
}

//FUNCION PARA ACTULIZAR DATOS
function actualizaDatos(){

    //TRAEMOS VALORES DE LOS IMPUT DEL FORMULARIO
	var id=$('#idpersona').val();
	var nombre=$('#nombreu').val();
	var apellido=$('#apellidou').val();
	var email=$('#emailu').val();
	var telefono=$('#telefonou').val();

    //AJAX QUE HACE LA CONEXION CON ACTULIZADATOS.PHP
	$.ajax({
		type:"POST",
		url:"php/actualizaDatos.php",
		data:{id:id,nombre:nombre,apellido:apellido,email:email,telefono:telefono},
		success:function(r){
			
			if(r==1){
				$("#tabla").load('php/tabla.php');
				alertify.success("Actualizado con exito :)");
			}else{
				alertify.error("Fallo el servidor :(");
			}
		}
	});

}

//funcion que muestra un mesaje de alerta, que manda el dato id a la funcion eliminarDatos(),si se confirma la eliminacion 
function preguntarSiNo(id){
	alertify.confirm('Eliminar Datos', '¿Esta seguro de eliminar este registro'+id+'?', 
					function(){ eliminarDatos(id) }
                , function(){ alertify.error('Se cancelo')});
}

//funcion que recupera el dato id y lo manda por medio del metodo post a eliminarDatos.php
function eliminarDatos(id){
		$.ajax({
			type:"POST",
			url:"php/eliminarDatos.php",
			data:{id:id},
			success:function(r){
				if(r==1){
					$("#tabla").load('php/tabla.php');
					alertify.success("Eliminado con exito!");
				}else{
					alertify.error("Fallo el servidor :(");
				}
			}
		});
}