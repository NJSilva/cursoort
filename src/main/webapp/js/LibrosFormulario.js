//* Archivo generado automaticamente por Generador_Formulario_Js *//> 
function grabarLibros() {
// envio al servlet
    $.ajax({
        url: '/BibliotecaORT/ServletGrabarLibros',
        dataType: 'json',
        type: 'POST',
        cache: false,
        async: false,
        data: {
            'libros_codigo': $("[name=libros_codigo]").val(),
            'libros_titulo': $("[name=libros_titulo]").val(),
            'libros_isbn': $("[name=libros_isbn]").val(),
            'libros_anio': $("[name=libros_anio]").val(),
            'libros_descripcion': $("[name=libros_descripcion]").val(),
            'libros_disponible': $("[name=libros_disponible]").val(),
            'tipos.tipos_nombre': $("#tagsCodigoTipos").val(),
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
