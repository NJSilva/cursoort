//* Archivo generado automaticamente por Generador_JQgrid_Js *//> 
function mantenimientoLogin(){
var seleccionPersonas=getSelectPersonas();

jQuery("#listaLogin").jqGrid({
url : '/cursoort/src/ServletObtenerLogin',
editurl : '/cursoort/src/ServletGrabarLogin',
datatype : "json",
type : "POST",
autowidth : false,
height : 'auto',
regional : 'es',
shrinkToFit : true,
cellsubmit : 'remote',
rowNum : 10,
rowList : [ 10, 20, 30 ,40 , 50],
pager : '#pagerListaLogin',
viewrecords : true,
sortorder : "asc",
loadonce : true,
hidegrid : true,
caption : "Login",
colNames : [ 'LOGIN_CLAVE',
'PERSONAS_CEDULA'],

colModel : [ {
name : 'login_clave',
index : 'login_clave',
editoptions : {size :10,
maxlength :10},
editable : true,
search:true,
editrules : {required : true}},
{
name : 'personas.personas_mail',
index : 'personas_cedula',
edittype: 'select',
editoptions : { value : seleccionPersonas},
editable : true,
search:true,
editrules : {required : true}}]});


}
