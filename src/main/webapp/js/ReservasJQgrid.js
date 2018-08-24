//* Archivo generado automaticamente por Generador_JQgrid_Js *//> 
function mantenimientoReservas() {
    var seleccionPersonas = getSelectPersonas();
    var seleccionLibros = getSelectLibros();

    jQuery("#listaReservas").jqGrid({
        url: '/BibliotecaORT/ServletObtenerReservas',
        editurl: '/BibliotecaORT/ServletGrabarReservas',
        datatype: "json",
        type: "POST",
        autowidth: false,
        height: 'auto',
        regional: 'es',
        shrinkToFit: true,
        cellsubmit: 'remote',
        rowNum: 10,
        rowList: [10, 20, 30, 40, 50],
        pager: '#pagerListaReservas',
        viewrecords: true,
        sortorder: "asc",
        loadonce: true,
        hidegrid: true,
        caption: "Reservas",
        colNames: ['PERSONAS_CEDULA',
            'LIBROS_CODIGO'],

        colModel: [{
                name: 'personas.personas_mail',
                index: 'personas_cedula',
                edittype: 'select',
                editoptions: {value: seleccionPersonas},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'libros.libros_titulo',
                index: 'libros_codigo',
                edittype: 'select',
                editoptions: {value: seleccionLibros},
                editable: true,
                search: true,
                editrules: {required: true}}]});

    jQuery("#listaReservas").jqGrid('navGrid', '#pagerListaReservas', {

        reloadGridOptions: {
            fromServer: true
        },

        edit: true,
        add: true,
        del: true,
        search: true,
        refresh: true,
        view: true
    });

}
