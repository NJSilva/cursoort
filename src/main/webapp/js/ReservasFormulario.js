//* Archivo generado automaticamente por Generador_Formulario_Js *//> 
function grabarReservas() {
// envio al servlet
    $.ajax({
        url: '/BibliotecaORT/ServletGrabarReservas',
        dataType: 'json',
        type: 'POST',
        cache: false,
        async: false,
        data: {
            'personas.personas_mail': $("#tagsCodigoPersonas").val(),
            'libros.libros_titulo': $("#tagsCodigoLibros").val(),
            'oper': 'add'
        },
        beforeSend: function () {
// Validaciones
            return true;
        },
        success: function (data) {
            console.log(data);
            if (data != 'OK') {
                alert(data);
            }
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
}
