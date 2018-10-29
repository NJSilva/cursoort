/*
    Defino el modulo para el sistema
*/


var modbiblioteca = angular.module('modbiblioteca', ['ngRoute', 'ngMaterial']);

modbiblioteca.config(function ($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: 'vistas/login.html'
        }) // Cuando se inicia se va al home directo porque la url tiene la barra 
        .when('/misprestamos', {
            templateUrl: 'vistas/misprestamos.html'
        })
        .when('/libros', {
            templateUrl: 'vistas/libros.html'
        })
        .when('/verunlibro', {
            templateUrl: 'vistas/unlibro.html'
        })

});

/*
Para controlar que el usuario este en sessionStorage, 
si no esta, se envia a la pagina de login.
*/
modbiblioteca.service('verUsuario', function ($location) {

    // verificar es un metodo que se ve desde afuera
    this.verificar = function () {
        var usuario = sessionStorage.getItem('cedula');
        if (usuario == null) {
            $location.path('/');
        }
    };
});

/* Para cambiar la URL facilmente */
modbiblioteca.value('url_Biblioteca', 'http://192.168.111.29:8080/BibliotecaORT/webresources');

// Modo local
// modbiblioteca.value('url_Biblioteca', 'http://localhost:8080/BibliotecaORT/webresources');


/* Controlador login */
modbiblioteca.controller("ctlbiblioteca", function ($scope, $http, $window, $location, url_Biblioteca, verUsuario, $mdDialog) {

    // Error en login
    $scope.errorlogin = false;
    $scope.mostrarHeader = false;
    $scope.mostrarFooter = false;

    // El usuario que esta logueado en el sistema
    $scope.user = {};

    //TODO Cambiar para local storage
    $scope.user.valid = 'no';
    $scope.user.name = '';
    $scope.user.clave = '';
    $scope.user.email = '';
    $scope.user.cedula = '';


    // Define el titulo de cada pantalla en la barra de menu
    $scope.titulopantalla = 'MIS PRESTAMOS';

    /***************************************************/
    /* LOGIN
    /***************************************************/

    $scope.ingresar = function login() {

        $scope.mostrarFooter = false;
        $scope.mostrarHeader = false;

        var req = {
            method: 'POST',
            url: url_Biblioteca + '/login',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 2018-cjpb",
            },
            //data: '{\"login_clave\":' + $scope.user.clave + ',\"personas\": {\"personas_cedula\": \"' + $scope.user.cedula + '\"}}'
            data: '{\"login_clave\":12345678,\"personas\": {\"personas_cedula\": \"19716428\"}}'
        };

        $http(req).then(
            function success(data) {
                $scope.user.valid = 'si';
                $scope.user.id = data.data.personas_id;
                $scope.user.name = data.data.personas_nombre;
                $scope.user.email = data.data.personas_mail;
                $scope.user.cedula = data.data.personas_cedula;

                $scope.mostrarFooter = false;
                $scope.mostrarHeader = true;

                // Grabo la cedula en el sessionStorage
                sessionStorage.clear();
                sessionStorage.setItem('cedula', $scope.user.cedula);


                $location.path('/misprestamos');

            },
            function error(data) {
                $scope.user.valid = 'no';
                $scope.user.id = '';
                $scope.user.name = '';
                $scope.user.email = '';
                $scope.user.cedula = '';
                $scope.errorlogin = true;
            }
        );

    };


    /***************************************************/
    /* Menu Hamburguesa
    /* Se recibe un index y de acuerdo al numero recibido
    /* se muestra la pantalla
    /* ng-repeat="item in 
    [
      0 'Reservar'
    , 1 'Mis Prestamos'
    ]"
    /***************************************************/
    $scope.announceClick = function announceClick(index) {

        switch (index) {
            case 0:
                $scope.titulopantalla = 'RESERVAR';
                $location.path('/libros');
                break;
            case 1:
                $scope.titulopantalla = 'MIS PRESTAMOS';
                $location.path('/misprestamos');
                break;
        };
    };

    /***************************************************/
    /* MIS PRESTAMOS
    /***************************************************/

    $scope.misprestamos = function misprestamos() {

        verUsuario.verificar($scope);

        var req = {
            method: 'GET',
            url: url_Biblioteca + '/prestamo?cedula=' + $scope.user.cedula
            /*    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 2018-cjpb",
                }
            */
        };

        $http(req).then(
            function success(data) {
                $scope.datosmisprestamos = data.data;
            },
            function error(data) {
                alert('Error: ' + data.status + ' ' + data.statusText);
                $scope.datosmisprestamos = null;
            }
        );

    };

    /***************************************************/
    /* LIBROS
    /***************************************************/

    $scope.libros = function libros() {

        verUsuario.verificar($scope);


        var req = {
            method: 'GET',
            url: url_Biblioteca + '/libro',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 2018-cjpb",
            }

        };

        $http(req).then(
            function success(data) {
                $scope.datoslibros = data.data;
            },
            function error(data) {
                alert('Error: ' + data.status + ' ' + data.statusText);
                $scope.datoslibros = null;
            }
        );

    };

    /***************************************************/
    /* FUNCION VOLVER
    /***************************************************/

    $scope.volver = function volver() {
        $window.history.back();
    };


    /***************************************************/
    /* VER UN LIBRO
    /***************************************************/

    $scope.verunlibro = function verunlibro(libro) {

        $scope.unlibro = libro;
        $location.path('/verunlibro');

    };

    /***************************************************/
    /* DEVOLVER UN LIBRO
    /***************************************************/

    $scope.devolverlibro = function devolverlibro(ev, object) {

        console.log(object.reserva);
        console.log(ev);

        var confirm = $mdDialog.confirm()
            .title('Devolver el libro seleccionado?')
            //.textContent('')
            //.ariaLabel('')
            .targetEvent(ev)
            .ok('Aceptar')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            console.log('Aceptar');
        }, function () {
            console.log('Cancelar');
        });
    };



    /***************************************************/
    /* RESERVAR UN LIBRO
    /***************************************************/

    $scope.reservarlibro = function reservarlibro(ev) {

        console.log($scope.unlibro);

        var confirm = $mdDialog.confirm()
            .title('Reserva el libro seleccionado?')
            .textContent('')
            .ariaLabel('')
            .targetEvent(ev)
            .ok('Aceptar')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function () {
            console.log('Aceptar');
        }, function () {
            console.log('Cancelar');
        });
    };


    /***************************************************/
    /* TODOS LOS LIBROS
    /***************************************************/

    $scope.verlibros = function verlibros() {
        $location.path('/libros');
    };


    /***************************************************/
    /* UN LIBRO
    /***************************************************/

    $scope.unlibro = function unlibro() {

        verUsuario.verificar($scope);

        var req = {
            method: 'GET',
            url: url_Biblioteca + '/libro/id=' + $scope.id_libro,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 2018-cjpb",
            }

        };

        $http(req).then(
            function success(data) {
                console.log('Dentro de funcion ' + JSON.stringify(data));
                $scope.datolibro = data.data;
            },
            function error(data) {
                console.log(data);
                alert('Error: ' + data.status + ' ' + data.statusText);
                $scope.datolibro = null;
            }
        );

    };


    /***************************************************/
    /* INSERTAR PRESTAMO
    /***************************************************/

    $scope.ingresarprestamo = function ingresarprestamo() {

        // Para enviar la fecha del dia de inicio del prestamo
        var fechaHoy = today();
        
        var req = {
            method: 'POST',
            url: url_prestamo + '/prestamo',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 2018-cjpb",
            },
            data: '{\"prestamos_fecha_desde\": ' + fechaHoy +', \"personas\": { \"personas_id\": '+ $scope.user.id +'},\"libros\":{libros_id:' + $scope.libro.libros_id +'}'
        };


        $http(req).then(
            function success(data) {
            },
            function error(data) {
            }
        );

    };

}); // Controller










