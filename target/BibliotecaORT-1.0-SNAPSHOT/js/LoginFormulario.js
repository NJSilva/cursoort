//* Archivo generado automaticamente por Generador_Formulario_Js *//> 
function grabarLogin(){
// envio al servlet
$.ajax({
url : '/BibliotecaORT/ServletGrabarLogin',
dataType : 'json',
type : 'POST',
cache : false,
async : false,
data : {
'login_clave' : $("[name=login_clave]").val(),
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
