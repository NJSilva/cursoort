/***************************************************/
/*    Funciones y codigo del sistema.              */
/***************************************************/


/* Ver las reservas de libros */
var URL_MISRESERVAS = 'http://192.168.111.29:8080/BibliotecaORT/webresources/prestamo?cedula=19716428';
var URL_LOGIN = 'http://192.168.111.29:8080/BibliotecaORT/webresources/login';

/* Datos del usuario que esta en el sistema logueado */
var persona = null;


/***************************************************/
/* index.html */
/***************************************************/

$(document).ready(function(){

$('#botonIngresar').click(function(){

    var usuario= $('#exampleInputEmail1').val();
    console.log(usuario);

    $.ajax(
    {
<<<<<<< HEAD:mobile/biblioteca.js
        url: 'http://localhost:8081/BibliotecaORT/webresources/login',
        method: 'POST',
        dataType: 'json',
        Authorization: 'Bearer 2018-cjpb',
        data: '{"login_clave": 12345678,"personas": {"personas_cedula": "19716428"}}'
 /*       
        ,
        success:function(data) {
            console.log( "La solicitud se ha completado correctamente." );
            console.log(data);
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log( "La solicitud a fallado: " +  textStatus);
            console.log(textStatus);
        }
        */
    });

   console.log('fin');
      
/*
	$.ajax({
		url : '/WebSolTra/ServletImpresion',
		// dataType : 'json',
		type : 'GET',
		cache : false,
		async : true,
		data : {
			'codigoimpresion' : grilla.selector,
			'idsolicitud' : filaSeleccionada.idsolicitud
		},
		success : function(data) {
			var myWindow = window.open("", "MsgWindow",
					"location=1,status=1,scrollbars=1,width=800,height=600%");
			myWindow.document.write(data);
		},
		error : function(request, textStatus, errorThrown) {
			alert("error:" + textStatus + errorThrown);
			console.log($.parseJSON(request));
		}
	});

*/   
      

=======
        url: URL_LOGIN,
        method: "POST",
        dataType: "json",
        Authorization: "Bearer 2018-cjpb",
        data: '{"login_clave": 12345678,"personas": {"personas_cedula": "19716428"}}',
        success : function(data) {
            console.log( "La solicitud se ha completado correctamente." );
            console.log(data);
    },
        error: function(request, textStatus, errorThrown){
            console.log(request);
            console.log( "La solicitud a fallado: " +  textStatus);
            console.log(textStatus);
        }
    });

        console.log('fin');
});
>>>>>>> c1ef25dfb45af9907be565206bfc0c8898733d4a:mobileJquery/biblioteca.js
});


/***************************************************/
/* menuHamburguesa*/
/***************************************************/

function activarMenu(){

$('#hamburger').click(function(){

    if ($('#menu').css('display') == 'none'){

        $('#menu').css('display' , 'block');

        $('#hamburger .line1').css('transform' , 'rotate(-135deg)');
        $('#hamburger .line3').css('transform' , 'rotate(135deg)');

        $('#hamburger .line1').css('margin-top' , '10px');
        $('#hamburger .line2').css('opacity' , '0');
        $('#hamburger .line3').css('margin-top' , '-9px');
    }
    else{
        $('#menu').css('display' , 'none');

        $('#hamburger .line1').css('transform' , 'rotate(0)');
        $('#hamburger .line3').css('transform' , 'rotate(0)');

        $('#hamburger .line1').css('margin-top' , '0px');
        $('#hamburger .line2').css('opacity' , '100');
        $('#hamburger .line3').css('margin-top' , '0px');
    }
});

};



/***************************************************/
/* misreservas.html*/
/***************************************************/

function misReservas(){

    $('.bodyBlanco').load("misreservas.html");

    $.ajax({
        url: URL_MISRESERVAS,
        type : 'GET',

        success: function(data){

            for (var i = 0; i < data.length; i++) {
                var libro = data[i].libros;
                var tipo = libro.tiposVO;

                $('section').append('<div class="row reserva"><div class="col-3"><figure class="imagenlibro"><img src="libros/' + libro.libros_imagen +'" alt="" srcset=""></figure></div><div class="col"><p class="titulolibro">'+ libro.libros_titulo +'</p><p class="autorlibro">' + libro.libros_autor+'</p><p class="desde">Desde:</p><p class="fechadesde">' + data[i].prestamos_fecha_desde + ' </p></div><div class="col-3"><p class="tipolibro">' + tipo.tipos_nombre+ '</p></div></div><div class="separador"></div>');

            }
        }
    });
};
