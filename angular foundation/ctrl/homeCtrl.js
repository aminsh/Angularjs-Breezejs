var app = angular.module('app');

app.controller('homeCtrl', function($scope, dialogService){
    $scope.title = 'Home';

    var dialog = dialogService.create('error', {
        className: 'errorDialog',
        controller: { message: "scope message" },
        persistent: true,
        backdrop: false
    });

    $scope.showModal = function(){
        dialog.open();
    };
});