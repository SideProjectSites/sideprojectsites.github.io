/**
 * Created by chen.f on 21/09/14.
 */

var app = angular.module('MilionPixelsApp.controllers',[]);

    app.controller('homeController', ['$rootScope','$scope','$location','homeAPIService','popupService',
        function ($rootScope,$scope,$location,homeAPIService,popupService) {

            // TODO Chen : Move all this lists building logic to server and return to client
            var lists = [];
            var nums = [];
            var divideTo = 100;
            var wantedRange = 10;
            var ranges = [];

            for (var i=0; i<divideTo; i++) {
                ranges.push({min:i*wantedRange,max:i*wantedRange+wantedRange});
                nums.push(i);
            }
            var pixelsList = [];

            for (var i=0; i<ranges.length; i++) {
                var min = ranges[i].min;
                var max = ranges[i].max;
                for (var x = min; x < max; x++) {
                    for (var y = min; y < max; y++) {
                        pixelsList.push({
                            linkPath: 'http://www.youtube.com',
                            areaText: x * 10 + ',' + y * 10 + ',' + (x * 10 + 10) + ',' + (y * 10 + 10)
                        });
                    }
                }
                lists.push(pixelsList);
                console.log('length: '+ pixelsList.length);
                pixelsList = [];
            }
            $scope.numbers = nums;
            $scope.pixelsList = lists;

            $scope.markToBuy = function(elem){
                if ($scope.mDown && !elem.chosen) {
                    elem.color = '#1A485F';
                    elem.chosen = true;
                }
            };

            $scope.mDown = false;

            $scope.startedMarking = function(){
              $scope.mDown = true;
            };

            $scope.stoppedMarking = function(e){
              $scope.mDown = false;
                document.getElementById("pup").style.top = e.y + 'px';
                document.getElementById("pup").style.left = e.x + 'px';
                var buttonData = new ButtonData("Buy",function(){
                    popupService.hide();
                    $scope.buyPixel();
                });
                popupService.info("Buy process","Buy pixels" ,buttonData);
            };

            $scope.buyPixel = function(item){
                $rootScope.itemToBuy = item;
                $location.path('/buyPixels');
            };
            //$scope.getData = function(){
            //    debugger;
            //    var response = homeAPIService.getPixelData()
            //      .then(function(response){
            //        $scope.results = response.data;
            //      },function(error){
            //          var buttonData = new ButtonData("Yep",function(){alert("error!")},"Cancel",true);
            //          popupService.error("Home","Error while trying to get pixel data:" + error.statusText,buttonData);
            //       })
            //};
            //$scope.getData();
        }]);

    app.controller('headerController', ['$scope',
    function ($scope) {

    }]);

     app.controller('monitoringController', ['$scope','$location','monitoringAPIService','popupService',
        function ($scope,$location,monitoringAPIService,popupService) {
            $scope.getTestResults = function(){
               var response = monitoringAPIService.getTestResults()
                   .then(function(response){
                        $scope.servers = response.data.Data.Servers;
                   },function(error){
                       console.log('Error occurred in monitoring process' + error.statusText);
                       var buttonData = new ButtonData("Yep",function(){alert("error!")},"Cancel",true);
                       popupService.error("Monitoring tests","Error while trying to get test results:" + error.statusText,buttonData);
                   })
            };

            $scope.getTestResults();
//            setInterval($scope.getTestResults,10000);
    }]);

    app.controller('buyPixelsController', ['$scope','$http','$location','buyPixelsAPIService',
        function ($scope, $http, $location,buyPixelsAPIService) {
            $scope.handleImage = function(event){
                var reader = new FileReader();
                reader.onload = function(event) {
                    $scope.imagePath = event.target.result;
                    $scope.$apply();
                };
                reader.readAsDataURL(event.target.files[0]);

                var files = event.target.files;
                if (files && files.length > 0) {
                    var chosenFile = files[0];
                    $scope.imageToUpload = chosenFile;
                    console.log('Chosen image: ' + chosenFile);
                    var name = chosenFile.name;
                    var size = chosenFile.size;
                    var type = chosenFile.type;
                    console.log('File data name: ' + name + " size: " + size + " type: " + type);
                }
            };

            $scope.submitUserData = function(userData){
                if (userData && userData.fullName && userData.email) {
                    alert('Going to submit user name: ' + userData.fullName + " email: " + userData.email +
                    " file: " + $scope.imageToUpload.name);
                    $scope.amount = 3;
                    $scope.quantity = 10;
                    $http({
                        method: 'POST',
                        url: "http://localhost:5492/PixelsData/PostUserBuyData",
                        //IMPORTANT!!! You might think this should be set to 'multipart/form-data'
                        // but this is not true because when we are sending up files the request
                        // needs to include a 'boundary' parameter which identifies the boundary
                        // name between parts in this multi-part request and setting the Content-type
                        // manually will not set this boundary parameter. For whatever reason,
                        // setting the Content-type to 'false' will force the request to automatically
                        // populate the headers properly including the boundary parameter.
                        headers: {'Content-Type': 'multipart/form-data'},
                        //This method will allow us to change how the data is sent up to the server
                        // for which we'll need to encapsulate the model data in 'FormData'
                        transformRequest: function (data, headersGetter) {
                            var formData = new FormData();
                            angular.forEach(data, function (value, key) {
                                formData.append(key, value);
                            });

                            var headers = headersGetter();
                            delete headers['Content-Type'];

                            return formData;
                        },
                        //Create an object that contains the model and files which will be transformed
                        // in the above transformRequest method
                        //data: { model: $scope.model, files: $scope.files }
                        //data: { name: "Chen", email:'my@email.com', fileData:$scope.imageToUpload }
                        data: {fileData: $scope.imageToUpload}
                    }).
                        success(function (data, status, headers, config) {
                            alert("success!");
                            $scope.submited = true;
                        }).
                        error(function (data, status, headers, config) {
                            alert("failed!");
                            $scope.submited = false;
                        });
                }
            };


    }]);


    app.controller('serversManagerController', ['$scope','$location','serversManagerAPIService',
        function ($scope, $location,serversManagerAPIService) {
        $scope.getServers = serversManagerAPIService.getServers()
            .success(function(response){
                console.log(response);
            })
            .error(function(response){
                console.log(response);
            });

        $scope.recycleApi = serversManagerAPIService.recycleApi()
            .success(function(response){
                console.log(response);
            })
            .error(function(response){
                console.log(response);
            });

        $scope.stopNightSleepServers = serversManagerAPIService.stopNightSleepServers()
                .success(function(response){
                    console.log(response);
                })
                .error(function(response){
                    console.log(response);
                });

        $scope.startNightSleepServers = serversManagerAPIService.startNightSleepServers()
            .success(function(response){
                console.log(response);
            })
            .error(function(response){
                console.log(response);
            });

    }]);

