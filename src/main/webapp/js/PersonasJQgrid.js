//* Archivo generado automaticamente por Generador_JQgrid_Js *//> 
function mantenimientoPersonas() {

    jQuery("#listaPersonas").jqGrid({
        url: '/BibliotecaORT/ServletObtenerPersonas',
        editurl: '/BibliotecaORT/ServletGrabarPersonas',
        datatype: "json",
        type: "POST",
        autowidth: false,
        height: 'auto',
        regional: 'es',
        shrinkToFit: true,
        cellsubmit: 'remote',
        rowNum: 10,
        rowList: [10, 20, 30, 40, 50],
        pager: '#pagerListaPersonas',
        viewrecords: true,
        sortorder: "asc",
        loadonce: true,
        hidegrid: true,
        caption: "Personas",
        colNames: ['PERSONAS_CEDULA',
            'PERSONAS_MAIL',
            'PERSONAS_NOMBRE'],

        colModel: [{
                name: 'personas_cedula',
                index: 'personas_cedula',
                editoptions: {size: 10,
                    maxlength: 10},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'personas_mail',
                index: 'personas_mail',
                editoptions: {size: 50,
                    maxlength: 50},
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'personas_nombre',
                index: 'personas_nombre',
                edittype: "textarea",
                editoptions: {rows: "6",
                    cols: "100",
                    size: 120,
                    maxlength: 120},
                editable: true,
                search: true,
                editrules: {required: true}}]});

    jQuery("#listaPersonas").jqGrid('navGrid', '#pagerListaPersonass', {

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
