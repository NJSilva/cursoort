//* Archivo generado automaticamente por Generador_Formulario_Js *//> 
function grabarTipos() {
// envio al servlet
    $.ajax({
        url: '/BibliotecaORT/ServletGrabarTipos',
        dataType: 'json',
        type: 'POST',
        cache: false,
        async: false,
        data: {
            'tipos_id': $("[name=tipos_id]").val(),
            'tipos_nombre': $("[name=tipos_nombre]").val(),
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
