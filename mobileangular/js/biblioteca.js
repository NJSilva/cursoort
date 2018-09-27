/*
    Defino el modulo para el sistema
*/


var modbiblioteca = angular.module('modbiblioteca' , ['ngRoute' , 'ngMaterial']);

modbiblioteca.config(function($locationProvider,$routeProvider){

    $locationProvider.html5Mode(true);

        $routeProvider
/*        .when('/'           ,{templateUrl : 'vistas/login.html'}) // Cuando se inicia se va al home directo porque la url tiene la barra */
        .when('/'           ,{templateUrl : 'vistas/misreservas.html'}) // Cuando se inicia se va al home directo porque la url tiene la barra
        .when('/misreservas',{templateUrl : 'vistas/misreservas.html'} 
    )
});

/* Controlador index */
modbiblioteca.controller("ctlindex" , function($scope){
    $scope.mensaje='Desde controlador_index';
});


/* Controlador login */
modbiblioteca.controller("ctllogin" , function($scope , $http){

    // El usuario que esta logueado en el sistema
    $scope.user={};

    $scope.user.valid='no'; 
    $scope.user.name=''; 
    $scope.user.password=''; 
    $scope.user.email='';
    $scope.user.phone='';
    $scope.user.adress='';

    $scope.clicked = function() {
        console.log($scope.user.name);
        console.log($scope.user.password);
        $scope.user.valid = 'si';

        $http({
            method : 'POST',
            crossDomain: true,
            url : 'http://192.168.111.29:8080/BibliotecaORT/webresources/login',
            data :  "{\t\"login_clave\": 12345678,\r\n\t\"personas\": {\r\n\t\t\"personas_cedula\": \"19716428\"\r\n\t}\r\n}",
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer 2018-cjpb",                
            }
        });        

    };
   
});










