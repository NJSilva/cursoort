//* Archivo generado automaticamente por Generador_JQgrid_Js *//> 
function mantenimientoTipos() {

    jQuery("#listaTipos").jqGrid({
        url: '/BibliotecaORT/ServletObtenerTipos',
        editurl: '/BibliotecaORT/ServletGrabarTipos',
        datatype: "json",
        type: "POST",
        autowidth: false,
        height: 'auto',
        regional: 'es',
        shrinkToFit: true,
        cellsubmit: 'remote',
        rowNum: 10,
        rowList: [10, 20, 30, 40, 50],
        pager: '#pagerListaTipos',
        viewrecords: true,
        sortorder: "asc",
        loadonce: true,
        hidegrid: true,
        caption: "Tipos",
        colNames: ['TIPOS_ID',
            'TIPOS_NOMBRE'],

        colModel: [{
                name: 'tipos_id',
                index: 'tipos_id',
                editoptions: {size: 5,
                    maxlength: 5},
                align: 'right',
                formatter: 'integer',
                editable: true,
                search: true,
                editrules: {required: true}},
            {
                name: 'tipos_nombre',
                index: 'tipos_nombre',
                editoptions: {size: 50,
                    maxlength: 50},
                editable: true,
                search: true,
                editrules: {required: true}}]});

    jQuery("#listaTipos").jqGrid('navGrid', '#pagerListaTipos', {

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
