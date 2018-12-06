var myApp = angular.module('myapp', ['rzModule','ui.bootstrap']);
myApp.controller('TestController', function TestController($scope){

    $scope.slider = {
        value: 10,
        options: {
          floor: 0,
          ceil: 100,
          step: 1,
          showTicks: true
        }
    };

    $scope.fr_value = 3;
    $scope.num_correct = 0;

    $scope.getRandomNumber = function(){
        $scope.randomNumber = Math.floor((Math.random()*100)+1);
      };

    $scope.nextTask = function() {
        if($scope.slider.value == $scope.randomNumber){
            $scope.num_correct = $scope.num_correct + 1;
            //when done with repition 
            if($scope.num_correct == $scope.fr_value){
                $scope.playTone();
                window.location.href = "main.html";
            }
        }
        
    };

    $scope.playTone = function() {
        var audio = new Audio('audio/service-bell.mp3');
        audio.play();
    };
});