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


/* Controlador login */
modbiblioteca.controller("ctlbiblioteca", function ($scope, $http, $window, $location) {

    // Error en login
    $scope.errorlogin = false;
    $scope.mostrarHeader = false;
    $scope.mostrarFooter = false;

    // El usuario que esta logueado en el sistema
    $scope.user = {};

    $scope.user.valid = 'no';
    $scope.user.name = '';
    $scope.user.clave = '';
    $scope.user.email = '';
    $scope.user.cedula = '';

    /***************************************************/
    /* LOGIN
    /***************************************************/

    $scope.ingresar = function login() {

        $scope.mostrarFooter = false;
        $scope.mostrarHeader = false;

        var req = {
            method: 'POST',
            url: 'http://192.168.111.29:8080/BibliotecaORT/webresources/login',
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
    /***************************************************/
    $scope.announceClick = function announceClick(index) {


        switch (index) {
            case 0 :
            $location.path('/libro');
                break;
            case 1 :
                $location.path('/misreservas');
                break;    
        };
    };

        /***************************************************/
        /* MIS RESERVAS
        /***************************************************/

        $scope.mireserva = function misReservas() {

            console.log('function mireserva');

            var req = {
                method: 'GET',
                url: 'http://192.168.111.29:8080/BibliotecaORT/webresources/prestamo?cedula=' + $scope.user.cedula
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

            console.log('function libros');

            var req = {
                method: 'GET',
                url: 'http://192.168.111.29:8080/BibliotecaORT/webresources/libro',
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










