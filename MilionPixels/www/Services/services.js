/**
 * Created by chen.f on 21/09/14.
 */

angular.module('MilionPixelsApp.services',[]).
    factory('homeAPIService', function($http){
        var homeAPI = {};

        homeAPI.getPixelData = function() {
            //return $http.get('http://52.30.69.137:11223/PixelsData/GetPixelsData');
            //return $http.get('http://localhost:5492/PixelsData/GetPixelsData');
            //};
            var pixelsList = [];
            for (var i=0;i<100;i++){
                for (var j=0; j<100; j++){

                }
            }
            var promise = new Promise(function(resolve, reject) {
                if (pixelsList) {
                    resolve(pixelsList);
                }
                else {
                    reject(Error("It broke"));
                }
            });
            console.log('getPixelData returning response!'+ jsonDataExample);
            return promise
        };
        return homeAPI;
    })
    .factory('monitoringAPIService', function($http){
        var monitoringAPI = {};

        monitoringAPI.getTestResults = function(){
            console.log('Getting test results...');
            return $http.get('http://scapi1717472.gamingo.com:2121/RocketTools/GetMonitoringResults',
                        {params : {userName:'RocketToolUser',password :'rocket12345'}});
            }

        return monitoringAPI;
    })

    .factory('buyPixelsAPIService', function($http){
        var onlineUsersAPI = {};

        onlineUsersAPI.getConnectedUsersData = function(){
            console.log('Getting online users...');
            return $http.get('http://scapi1717472.gamingo.com:2121/RocketTools/GetConnectedUsersData',
                {params : {userName:'RocketToolUser',password :'rocket12345'}})
                .error(function(){
                    console.log('Error while getting online users');
                })
                .success(function(response){
                    console.log("Online users result success:" + response);
                });
        };
    })

    .factory('popupService', function() {
        var popupService = {};

        popupService.popupObj = {
            show: false,
            title: '',
            content: '',
            buttonContent:'',
            buttonAction:'',
            type: 'success'
        };

        popupService.popupTypes = ['success', 'info', 'warning'];

        popupService.initPopup = function(type,title, content,buttonsData) {
            popupService.popupObj.title = title;
            popupService.popupObj.content = content;
            popupService.popupObj.type = popupService.popupTypes[type];
            popupService.popupObj.show = true;
            popupService.popupObj.buttonContent = buttonsData.buttonContent;
            popupService.popupObj.buttonAction = buttonsData.buttonAction;
            popupService.popupObj.button2Content = buttonsData.button2Content;
            popupService.popupObj.showButton2 = buttonsData.showButton2;
        };
        popupService.success = function(title, content,buttonsData) {
            popupService.initPopup(0, title, content,buttonsData);
        };
        popupService.info = function(title, content,buttonsData) {
            popupService.initPopup(1, title, content,buttonsData);
        };
        popupService.warning = function(title, content,buttonsData) {
            popupService.initPopup(2, title, content,buttonsData);
        };
        popupService.hide = function() {
            popupService.popupObj.show = false;
        };

        return popupService;
    })

    .factory('serversManagerAPIService', function($http){
        var serversManagerAPI = {};

            serversManagerAPI.getServers = function(){
            console.log('Getting servers...');
            return $http.get('http://scapi1717472.gamingo.com:2121/RocketTools/GetServersData',
                {params : {userName:'RocketToolUser',password :'rocket12345'}})
                .error(function(){
                    console.log('Error while getting servers');
                })
                .success(function(response){
                        console.log("Got server:" + response);
                    });
            };

        serversManagerAPI.recycleAPI = function(){
            console.log('Recycling api...');
            return $http.get('http://scapi1717472.gamingo.com:2121/RocketTools/RecyclyApi',
                {params : {userName:'RocketToolUser',password :'rocket12345'}})
                .error(function(){
                    console.log('Error while getting servers');
                })
                .success(function(response){
                    console.log("Got server:" + response);
                });
        };

        serversManagerAPI.stopNightSleepServers = function(){
            console.log('Stopping night sleep servers...');
            return $http.get('http://scapi1717472.gamingo.com:2121/RocketTools/StopNightSleepServers',
                {params : {userName:'RocketToolUser',password :'rocket12345'}})
                .error(function(){
                    console.log('Error while stopping sleep servers');
                })
                .success(function(response){
                    console.log("Stopped servers" + response);
                });
        };

        serversManagerAPI.startNightSleepServers = function(){
            console.log('Starting night sleep servers...');
            return $http.get('http://scapi1717472.gamingo.com:2121/RocketTools/StartNightSleepServers',
            {params : {userName:'RocketToolUser',password :'rocket12345'}})
            .error(function(){
                console.log('Error while starting sleep servers');
            })
                .success(function(response){
                    console.log("Started servers" + response);
                });
        };
    });