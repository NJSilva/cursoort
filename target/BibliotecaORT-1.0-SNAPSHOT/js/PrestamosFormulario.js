//* Archivo generado automaticamente por Generador_Formulario_Js *//> 
function grabarPrestamos(){
// envio al servlet
$.ajax({
url : '/BibliotecaORT/ServletGrabarPrestamos',
dataType : 'json',
type : 'POST',
cache : false,
async : false,
data : {
'prestamos_fecha_desde' : $("[name=prestamos_fecha_desde]").val(),
'prestamos_fecha_hasta' : $("[name=prestamos_fecha_hasta]").val(),
'libros.libros_titulo' : $("#tagsCodigoLibros").val(),
'personas.personas_mail' : $("#tagsCodigoPersonas").val(),
'oper':'add'
},
beforeSend : function(){
// Validaciones
return true;
},
success : function(data) {
console.log(data);
if (data != 'OK') {
alert(data);
}
},
error : function(request, textStatus, errorThrown) {
alert("error:" + textStatus + errorThrown);
console.log($.parseJSON(request));
}
});
}
