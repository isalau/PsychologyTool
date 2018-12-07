var myApp = angular.module('myapp', ['rzModule','ui.bootstrap']);
myApp.controller('TestController', function TestController($scope,$window){

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
    $scope.num_session = 1;

    $scope.getRandomNumber = function(){
        $scope.randomNumber = Math.floor((Math.random()*100)+1);
      };

    $scope.nextTask = function() {
        if($scope.slider.value == $scope.randomNumber){
            $scope.num_correct = $scope.num_correct + 1;
            //when done with repition 
            if($scope.num_correct == $scope.fr_value){
                $window.alert("You may now use your phone")
                $scope.playTone();

                $scope.num_correct = 0;
                //I was thinking we could create a pop-up dialog for each session
                //and then go to main.html after the 3rd session

                
                if($scope.num_session == 3){
                    $scope.num_session = 1;
                    window.location.href = "main.html";
                }

                $scope.num_session = $scope.num_session + 1;
            }
        }
        
    };

    $scope.updateFR = function(fr_value) {
        $scope.fr_value = fr_value;
    };

    $scope.playTone = function() {
        //Audio reference: Daniel Simion, License: Attribution 3.0
        //Link: http://soundbible.com/2218-Service-Bell-Help.html
        var audio = new Audio('audio/service-bell.mp3');
        audio.play();
    };
});