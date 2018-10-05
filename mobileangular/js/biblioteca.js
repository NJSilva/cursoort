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
    $scope.user.password=''; 
    $scope.user.email='';
    $scope.user.phone='';
    $scope.user.adress='';

    $scope.clicked = function() {
        console.log($scope.user.name);
        console.log($scope.user.password);
        $scope.user.valid = 'si';

        var req = {
            method : 'POST',
            url : 'http://localhost:8080/BibliotecaORT/webresources/login',
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer 2018-cjpb",                
            },
            data :  "{\"login_clave\": 12345678,\"personas\": {\"personas_cedula\": \"19716428\"}}",
        };  

        console.log(req);
        
        $http(req).then(
            function success(data){
                console.log(data);
                alert('ok');
            }, 
            function error(data){
                console.log(data);
                alert('error');
            }
        );

    };
   
});










