//* Archivo generado automaticamente por Generador_JQgrid_Js *//> 
function mantenimientoPrestamos() {
    var seleccionLibros = getSelectLibros();
    var seleccionPersonas = getSelectPersonas();

    jQuery("#listaPrestamos").jqGrid({
        url: '/BibliotecaORT/ServletObtenerPrestamos',
        editurl: '/BibliotecaORT/ServletGrabarPrestamos',
        datatype: "json",
        type: "POST",
        autowidth: false,
        height: 'auto',
        regional: 'es',
        shrinkToFit: true,
        cellsubmit: 'remote',
        rowNum: 10,
        rowList: [10, 20, 30, 40, 50],
        pager: '#pagerListaPrestamos',
        viewrecords: true,
        sortorder: "asc",
        loadonce: true,
        hidegrid: true,
        caption: "Prestamos",
        colNames: ['LIBROS_CODIGO',
            'PERSONAS_CEDULA',
            'PRESTAMOS_FECHA_DESDE',
            'PRESTAMOS_FECHA_HASTA'],

        colModel: [{
                name: 'libros.libros_titulo',
                index: 'libros_codigo',
                edittype: 'select',
                editoptions: {value: seleccionLibros},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'personas.personas_mail',
                index: 'personas_cedula',
                edittype: 'select',
                editoptions: {value: seleccionPersonas},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'prestamos_fecha_desde',
                index: 'prestamos_fecha_desde',
                editoptions: {dataInit: function (el) {
                        setTimeout(function () {
                            $(el).datepicker();
                        }, 200);
                    }},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'prestamos_fecha_hasta',
                index: 'prestamos_fecha_hasta',
                editoptions: {dataInit: function (el) {
                        setTimeout(function () {
                            $(el).datepicker();
                        }, 200);
                    }},
                editable: true,
                search: true,
                editrules: {required: false}}]});

    jQuery("#listaPrestamos").jqGrid('navGrid', '#pagerListaPrestamos', {

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
