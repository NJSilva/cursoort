/*
    Defino el modulo para el sistema
*/


var modbiblioteca = angular.module('modbiblioteca' , ['ngRoute' , 'ngMaterial']);

modbiblioteca.config(function($locationProvider,$routeProvider){

    $locationProvider.html5Mode(true);

        $routeProvider
        .when('/'           ,{templateUrl : 'vistas/login.html'}) // Cuando se inicia se va al home directo porque la url tiene la barra 
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
    $scope.user.clave='';
    $scope.user.email='';
    $scope.user.cedula='';

    $scope.clicked = function() {

        console.log($scope.user.cedula);
        console.log($scope.user.clave);

        var req = {
            method : 'POST',
            url : 'http://localhost:8080/BibliotecaORT/webresources/login',
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer 2018-cjpb",                
            },
            data :  '{\"login_clave\":' + $scope.user.clave +',\"personas\": {\"personas_cedula\": \"' + $scope.user.cedula + '\"}}'
        };  

        $http(req).then(
            function success(data){
                $scope.user.valid = 'si';
                $scope.user.name=data.data.personas_nombre; 
                $scope.user.email=data.data.personas_mail;
                $scope.user.cedula=data.data.personas_cedula;
                
            }, 
            function error(data){
                console.log(data);
                alert('Error: ' + data.status +' '+data.statusText);
                $scope.user.valid = 'no'; 
                $scope.user.name=''; 
                $scope.user.email='';
                $scope.user.cedula='';                
            }
        );

    };
   
});










