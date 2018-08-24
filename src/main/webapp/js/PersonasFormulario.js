//* Archivo generado automaticamente por Generador_Formulario_Js *//> 
function grabarPersonas() {
// envio al servlet
    $.ajax({
        url: '/BibliotecaORT/ServletGrabarPersonas',
        dataType: 'json',
        type: 'POST',
        cache: false,
        async: false,
        data: {
            'personas_cedula': $("[name=personas_cedula]").val(),
            'personas_mail': $("[name=personas_mail]").val(),
            'personas_nombre': $("[name=personas_nombre]").val(),
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
