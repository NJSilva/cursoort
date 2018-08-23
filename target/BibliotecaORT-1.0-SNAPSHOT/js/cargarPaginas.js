//* Archivo generado automaticamente por GeneradorCargarPaginas *//
//**************************************************************************//
function cambioLibros() {
$("#seccion").empty();
$("#seccion").load("../html/LibrosJQgrid.html", function() {
mensaje();
});
}
//**************************************************************************//
//**************************************************************************//
function cambioLibrosFormulario() {
$("#seccion").empty();
$("#seccion").load("../html/LibrosFormulario.html", function() {
});
}
//**************************************************************************//
//**************************************************************************//
function cambioLogin() {
$("#seccion").empty();
$("#seccion").load("../html/LoginJQgrid.html", function() {
mensaje();
});
}
//**************************************************************************//
//**************************************************************************//
function cambioLoginFormulario() {
$("#seccion").empty();
$("#seccion").load("../html/LoginFormulario.html", function() {
});
}
//**************************************************************************//
//**************************************************************************//
function cambioPersonas() {
$("#seccion").empty();
$("#seccion").load("../html/PersonasJQgrid.html", function() {
mensaje();
});
}
//**************************************************************************//
//**************************************************************************//
function cambioPersonasFormulario() {
$("#seccion").empty();
$("#seccion").load("../html/PersonasFormulario.html", function() {
});
}
//**************************************************************************//
//**************************************************************************//
function cambioPrestamos() {
$("#seccion").empty();
$("#seccion").load("../html/PrestamosJQgrid.html", function() {
mensaje();
});
}
//**************************************************************************//
//**************************************************************************//
function cambioPrestamosFormulario() {
$("#seccion").empty();
$("#seccion").load("../html/PrestamosFormulario.html", function() {
});
}
//**************************************************************************//
//**************************************************************************//
function cambioReservas() {
$("#seccion").empty();
$("#seccion").load("../html/ReservasJQgrid.html", function() {
mensaje();
});
}
//**************************************************************************//
//**************************************************************************//
function cambioReservasFormulario() {
$("#seccion").empty();
$("#seccion").load("../html/ReservasFormulario.html", function() {
});
}
//**************************************************************************//
//**************************************************************************//
function cambioTipos() {
$("#seccion").empty();
$("#seccion").load("../html/TiposJQgrid.html", function() {
mensaje();
});
}
//**************************************************************************//
//**************************************************************************//
function cambioTiposFormulario() {
$("#seccion").empty();
$("#seccion").load("../html/TiposFormulario.html", function() {
});
}
//**************************************************************************//
//**************************************************************************//
function mensaje() {
$("#resultado").fadeIn(1000).text("Carga completada").fadeOut(1000);
}
//**************************************************************************//
