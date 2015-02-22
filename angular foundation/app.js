
var app = angular.module('app', [
    'ngRoute', 'dcModal'
]);

app.config(function($routeProvider){
    $routeProvider.when('/', {templateUrl: 'partial/home.html', controller: 'homeCtrl'});
    $routeProvider.when('/two', {templateUrl: 'partial/two.html', controller: 'twoCtrl'});
});

//angular.element(document).ready(function() {
//    angular.bootstrap(document, ['angularModalDemo']);
//});




