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
        .when('/misreservas', {
            templateUrl: 'vistas/misreservas.html'
        })
        .when('/libro', {
            templateUrl: 'vistas/libros.html'
        })

});

modbiblioteca.service('verUsuario', function ($location) {

    this.verificar = function () {

        var usuario = sessionStorage.getItem('cedula');
        if (usuario == null) {
            $location.path('/');
        }
    };
});

/* Para cambiar la URL facilmente */
modbiblioteca.value('url_Biblioteca', 'http://192.168.111.29:8080/BibliotecaORT/webresources');


/* Controlador login */
modbiblioteca.controller("ctlbiblioteca", function ($scope, $http, $window, $location, url_Biblioteca, verUsuario) {

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
    $scope.titulopantalla = 'MIS RESERVAS';

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
                $scope.user.name = data.data.personas_nombre;
                $scope.user.email = data.data.personas_mail;
                $scope.user.cedula = data.data.personas_cedula;

                $scope.mostrarFooter = true;
                $scope.mostrarHeader = true;

                // Grabo la cedula en el sessionStorage
                sessionStorage.clear();
                sessionStorage.setItem('cedula', $scope.user.cedula);


                $location.path('/misreservas');

            },
            function error(data) {
                $scope.user.valid = 'no';
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
    , 1 'Mis Reservas'
    ]"
    /***************************************************/
    $scope.announceClick = function announceClick(index) {

        switch (index) {
            case 0:
                $scope.titulopantalla = 'RESERVAR';
                $location.path('/libro');
                break;
            case 1:
                $scope.titulopantalla = 'MIS RESERVAS';
                $location.path('/misreservas');
                break;
        };
    };

    /***************************************************/
    /* MIS RESERVAS
    /***************************************************/

    $scope.mireserva = function misReservas() {

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
                console.log('Dentro de funcion ' + JSON.stringify(data));
                $scope.datosmisreservas = data.data;
            },
            function error(data) {
                console.log(data);
                alert('Error: ' + data.status + ' ' + data.statusText);
                $scope.datosmisreservas = null;
            }
        );

    };

    /***************************************************/
    /* LIBROS
    /***************************************************/

    $scope.libros = function libros() {

        verUsuario.verificar($scope);

        console.log('function libros');

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
                console.log('Dentro de funcion ' + JSON.stringify(data));
                $scope.datoslibros = data.data;
            },
            function error(data) {
                console.log(data);
                alert('Error: ' + data.status + ' ' + data.statusText);
                $scope.datoslibros = null;
            }
        );

    };


});










