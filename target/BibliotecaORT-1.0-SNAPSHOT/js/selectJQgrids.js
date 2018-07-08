//* Archivo generado automaticamente por Generador_Select_Js *//>
function getSelectLibros() {
    var selectLibros = '';
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerLibros',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectLibros = selectLibros + data[i].libros_codigo + ':' +
                data[i].libros_titulo + ';';
            });
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectLibros;
}
function getSelectCodigoLibros() {
    var selectCodigoLibros = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerLibros',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectCodigoLibros.push(data[i].libros_codigo);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectCodigoLibros;
}
function getSelectNombreLibros() {
    var selectNombreLibros = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerLibros',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectNombreLibros.push(data[i].libros_titulo);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectNombreLibros;
}
function getSelectLogin() {
    var selectLogin = '';
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerLogin',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectLogin = selectLogin + data[i].login_clave + ':' +
                data[i].personas_cedula + ';';
            });
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectLogin;
}
function getSelectCodigoLogin() {
    var selectCodigoLogin = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerLogin',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectCodigoLogin.push(data[i].login_clave);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectCodigoLogin;
}
function getSelectNombreLogin() {
    var selectNombreLogin = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerLogin',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectNombreLogin.push(data[i].personas_cedula);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectNombreLogin;
}
function getSelectPersonas() {
    var selectPersonas = '';
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerPersonas',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectPersonas = selectPersonas + data[i].personas_cedula + ':' +
                data[i].personas_mail + ';';
            });
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectPersonas;
}
function getSelectCodigoPersonas() {
    var selectCodigoPersonas = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerPersonas',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectCodigoPersonas.push(data[i].personas_cedula);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectCodigoPersonas;
}
function getSelectNombrePersonas() {
    var selectNombrePersonas = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerPersonas',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectNombrePersonas.push(data[i].personas_mail);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectNombrePersonas;
}
function getSelectPrestamos() {
    var selectPrestamos = '';
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerPrestamos',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectPrestamos = selectPrestamos + data[i].libros_codigo + ':' +
                data[i].personas_cedula + ';';
            });
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectPrestamos;
}
function getSelectCodigoPrestamos() {
    var selectCodigoPrestamos = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerPrestamos',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectCodigoPrestamos.push(data[i].libros_codigo);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectCodigoPrestamos;
}
function getSelectNombrePrestamos() {
    var selectNombrePrestamos = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerPrestamos',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectNombrePrestamos.push(data[i].personas_cedula);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectNombrePrestamos;
}
function getSelectReservas() {
    var selectReservas = '';
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerReservas',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectReservas = selectReservas + data[i].personas_cedula + ':' +
                data[i].libros_codigo + ';';
            });
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectReservas;
}
function getSelectCodigoReservas() {
    var selectCodigoReservas = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerReservas',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectCodigoReservas.push(data[i].personas_cedula);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectCodigoReservas;
}
function getSelectNombreReservas() {
    var selectNombreReservas = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerReservas',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectNombreReservas.push(data[i].libros_codigo);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectNombreReservas;
}
function getSelectTipos() {
    var selectTipos = '';
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerTipos',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectTipos = selectTipos + data[i].tipos_codigo + ':' +
                data[i].tipos_nombre + ';';
            });
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectTipos;
}
function getSelectCodigoTipos() {
    var selectCodigoTipos = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerTipos',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectCodigoTipos.push(data[i].tipos_codigo);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectCodigoTipos;
}
function getSelectNombreTipos() {
    var selectNombreTipos = [];
    $.ajax({
        url: '/BibliotecaORT/src/ServletObtenerTipos',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {},
        success: function (data) {
            $.each(data, function (i, obj) {
                selectNombreTipos.push(data[i].tipos_nombre);
            })
        },
        error: function (request, textStatus, errorThrown) {
            alert("error:" + textStatus + errorThrown);
            console.log($.parseJSON(request));
        }
    });
    return selectNombreTipos;
}
