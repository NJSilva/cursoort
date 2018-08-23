//* Archivo generado automaticamente por Generador_JQgrid_Js *//> 
function mantenimientoLibros() {
    var seleccionTipos = getSelectTipos();

    jQuery("#listaLibros").jqGrid({
        url: '/BibliotecaORT/ServletObtenerLibros',
        editurl: '/BibliotecaORT/ServletGrabarLibros',
        datatype: "json",
        type: "POST",
        autowidth: false,
        height: 'auto',
        regional: 'es',
        shrinkToFit: true,
        cellsubmit: 'remote',
        rowNum: 10,
        rowList: [10, 20, 30, 40, 50],
        pager: '#pagerListaLibros',
        viewrecords: true,
        sortorder: "asc",
        loadonce: true,
        hidegrid: true,
        caption: "Libros",
        colNames: ['LIBROS_CODIGO',
            'LIBROS_TITULO',
            'LIBROS_ISBN',
            'LIBROS_ANIO',
            'LIBROS_DESCRIPCION',
            'LIBROS_DISPONIBLE',
            'TIPOS_CODIGO'],

        colModel: [{
                name: 'libros_codigo',
                index: 'libros_codigo',
                editoptions: {size: 12,
                    maxlength: 12},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'libros_titulo',
                index: 'libros_titulo',
                edittype: "textarea",
                editoptions: {rows: "6",
                    cols: "100",
                    size: 150,
                    maxlength: 150},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'libros_isbn',
                index: 'libros_isbn',
                editoptions: {size: 25,
                    maxlength: 25},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'libros_anio',
                index: 'libros_anio',
                editoptions: {size: 4,
                    maxlength: 4},
                align: 'right',
                formatter: 'integer',
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'libros_descripcion',
                index: 'libros_descripcion',
                edittype: "textarea",
                editoptions: {rows: "6",
                    cols: "100",
                    size: 300,
                    maxlength: 300},
                editable: true,
                search: true,
                editrules: {required: false}},
            {
                name: 'libros_disponible',
                index: 'libros_disponible',
                editoptions: {size: 5,
                    maxlength: 5},
                align: 'right',
                formatter: 'integer',
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'tipos.tipos_nombre',
                index: 'tipos_codigo',
                edittype: 'select',
                editoptions: {value: seleccionTipos},
                editable: true,
                search: true,
                editrules: {required: true}}]});


    jQuery("#listaLibros").jqGrid('navGrid', '#pagerListaLibros', {

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
