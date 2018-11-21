var myApp = angular.module('myapp', ['rzModule','ui.bootstrap']);
myApp.controller('TestController', function TestController($scope){

    $scope.slider = {
        minValue: 10,
        maxValue: 90,
        options: {
          floor: 0,
          ceil: 100,
          step: 1,
          showTicks: true
        }
    };

    $scope.getRandomNumber = function(){
        $scope.randomNumber = Math.floor((Math.random()*100)+1);
      };

    $scope.nextTask = function() {
        if($scope.slider.value == 70){
            $scope.slider.minValue = 50;
        }
    };
});