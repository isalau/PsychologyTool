var myApp = angular.module('myapp', ['rzModule','ui.bootstrap']);
myApp.controller('TestController', function TestController($scope){

    $scope.slider = {
        minValue: 10,
        maxValue: 90,
        options: {
          floor: 0,
          ceil: 100,
          step: 10,
          showTicks: true
        }
    };
});