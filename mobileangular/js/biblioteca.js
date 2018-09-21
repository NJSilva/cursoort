/*
    Defino el modulo para el sistema
*/
angular.module('app' , ['ngRoute' , 'ngMaterial'])

.config(function($locationProvider,$routeProvider){

    $locationProvider.html5Mode(true);

        $routeProvider
        .when('/',{templateUrl : 'vistas/login.html'}) // Cuando se inicia se va al home directo porque la url tiene la barra
        .when('/misreservas',{templateUrl:'vistas/misreservas.html'} 
    )
})

/* Controlador index */
.controller("controlador_index" , function($scope){
    $scope.mensaje='Desde controlador_index';
})

/* Controlador login */
.controller("controlador_login", function($scope){
    $scope.user = {
        name: 'Nicolas',
        clave: '',
        email: '',
        phone: '',
        address: ''
      };
})









