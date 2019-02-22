//what are our headers? 
var Data = [];
var clickTimes = [];
      
function convertArrayOfObjectsToCSV(args) {
      var result, ctr, keys, columnDelimiter, lineDelimiter, data;

      data = args.data || null;
      if (data == null || !data.length) {
          return null;
      }

      columnDelimiter = args.columnDelimiter || ',';
      lineDelimiter = args.lineDelimiter || '\n';

      keys = Object.keys(data[0]);

      result = '';
      result += keys.join(columnDelimiter);
      result += lineDelimiter;

      data.forEach(function(item) {
          ctr = 0;
          keys.forEach(function(key) {
              if (ctr > 0) result += columnDelimiter;

              result += item[key];
              ctr++;
          });
          result += lineDelimiter;
      });

      return result;
  }

function downloadCSV() {
  var data, filename, link;
  var csv = convertArrayOfObjectsToCSV({
    data: Data
  });
  if (csv == null){
    return;
  }
  
  filename = 'YourFileNameHere.csv';

  var blob = new Blob([csv], {type: "text/csv;charset=utf-8;"});

  if (navigator.msSaveBlob){ // IE 10+
    navigator.msSaveBlob(blob, filename)
  }
  else{
    var link = document.createElement("a");
    if (link.download !== undefined){

    // feature detection, Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style = "visibility:hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }
  }
}

const urlParams = new URLSearchParams(window.location.search);
const fr_value = urlParams.get('fr_value');

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

    $scope.fr_value = fr_value; 
    $scope.num_correct = 0;
    $scope.num_session = 1;

    $scope.updateFR = function(fr_value) {
      var fr_value = document.getElementById("menu").value;
      $scope.fr_value = fr_value;
      console.log("FR_VALUE: ");
      console.log($scope.fr_value);
      window.location.href = "index.html";
    };

    $scope.getRandomNumber = function(){
        $scope.randomNumber = Math.floor((Math.random()*100)+1);
      };

    $scope.removeOverlay = function(){
        document.getElementById('overlay').style.display = "none";
    };

    $scope.addOverlay = function(){
        document.getElementById('overlay').style.display = "block";
    }


  $scope.initalTime = 0; 
  $scope.numOfResponses = 0; 
  $scope.fr_value = fr_value; 
  $scope.num_correct = 0;
  $scope.num_session = 1;
  $scope.lastClick = 0;
  $scope.accuracy = 0; 

  $scope.updateFR = function(fr_value) {
    var fr_value = document.getElementById("menu").value;
    $scope.fr_value = fr_value;
    console.log("FR_VALUE: ");
    console.log($scope.fr_value);
    window.location.href = "index.html";
  };

  $scope.getRandomNumber = function(){
    var d = new Date();
    $scope.initalTime = d.getTime();
    $scope.randomNumber = Math.floor((Math.random()*100)+1);
  };

  $scope.nextTask = function() {
    console.log("scope.fr_value in nextTask: " + $scope.fr_value );

    $scope.numOfResponses = $scope.numOfResponses + 1;
    console.log("last clicked time: " + $scope.numOfResponses + " times");

    if ($scope.numOfResponses == 1 && $scope.num_session == 1){
      $scope.lastClick = $scope.initalTime; 
    }

    //get time of click
     
    var d = new Date();
    var newClick = d.getTime();
    var timeBetweenClicks = newClick - $scope.lastClick; 
    console.log("new clicked time: " + newClick );
    console.log("last clicked time: " + $scope.lastClick );
    console.log("between clicked time: " + timeBetweenClicks );
    $scope.lastClick = newClick; 
    clickTimes.push(timeBetweenClicks);
    console.log("Click Time Array: " + clickTimes);

    if($scope.slider.value == $scope.randomNumber){
      $scope.num_correct = $scope.num_correct + 1;
      //when done with repition
      if($scope.num_correct == $scope.fr_value){
          //determine accuracy 
          $scope.accuracy = ($scope.fr_value/$scope.numOfResponses); 
          console.log("Accuracy = " + $scope.accuracy); 
           
          //add number of responses numOfResponses to csv file
          //append to dictionary  
          $scope.addOverlay();
          $scope.playTone();
          setTimeout(function(){$scope.playTone(); document.getElementById('overlay').style.display = "none";},30000)
          $scope.num_correct = 0;
          
          

          //get average time between clicks 
          
          avgTimeBtwClicks = $scope.averageTimeClicks(clickTimes)
          
          var newData = {
              FR_Value: $scope.fr_value,
              Response_Frequency: $scope.numOfResponses,
              Accuracy: $scope.accuracy,
              Average_Time_Between_Clicks: avgTimeBtwClicks
          };

            Data.push(newData);
            console.log(Data);

          //I was thinking we could create a pop-up dialog for each session
          //and then go to main.html after the 3rd session

          if($scope.num_session == 3){
            $scope.num_session = 1;
            downloadCSV({ filename: "YourData.csv" })
            window.location.href = "main.html";
          }

          //clear out variables
          clickTimes  = []; 
          $scope.numOfResponses = 0;
          $scope.num_correct = 0;
          $scope.num_session = $scope.num_session + 1;
          if ($scope.num_session != 1){
            console.log("Before adding 30 secs: "+ $scope.lastClick);
            $scope.lastClick = $scope.lastClick + 30000; 
            console.log("YOu added 30 secs: "+ $scope.lastClick);
          }
      }
    }
  };

  $scope.averageTimeClicks = function(timeBtwClicks){
    var sum = 0;
    for(var i = 0; i < timeBtwClicks.length; i++){
      sum += timeBtwClicks[i]
    }

    return sum/timeBtwClicks.length
  };
  $scope.playTone = function() {
      //Audio reference: Daniel Simion, License: Attribution 3.0
      //Link: http://soundbible.com/2218-Service-Bell-Help.html
      var audio = new Audio('audio/service-bell.mp3');
      audio.play();
  };
});