/*
    Defino el modulo para el sistema
*/

var user = {
    valido: 'no',
    name: '',
    clave: '',
    email: '',
    phone: '',
    address: ''
  };


var modbiblioteca = angular.module('modbiblioteca' , ['ngRoute' , 'ngMaterial']);

modbiblioteca.config(function($locationProvider,$routeProvider){

    $locationProvider.html5Mode(true);

        $routeProvider
        .when('/',{templateUrl : 'vistas/login.html'}) // Cuando se inicia se va al home directo porque la url tiene la barra
        .when('/misreservas',{templateUrl:'vistas/misreservas.html'} 
    )
});

/* Controlador index */
modbiblioteca.controller("ctlindex" , function($scope){
    $scope.mensaje='Desde controlador_index';
});


/* Controlador login */
modbiblioteca.controller("ctllogin" , function($scope){

    $scope.hola = 'hola Nico';

      $scope.clicked = function() {
          // user.valido = 'si';
          alert('boton ingresar');
      };
   
});









