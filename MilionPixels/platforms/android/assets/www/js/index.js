'use strict';


$(document).bind("mobileinit", function(){
    $.extend($.event.special.swipe,{
        scrollSupressionThreshold: 10, // More than this horizontal displacement, and we will suppress scrolling.
        durationThreshold: 1000, // More time than this, and it isn't a swipe.
        horizontalDistanceThreshold: 30,  // Swipe horizontal displacement must be more than this.
        verticalDistanceThreshold: 75  // Swipe vertical displacement must be less than this.
    });
});

$(document).on("pagecreate","#LoginPage",function(){
    App.loadUserData();

    $(document).on('click','#btnLogin',function (){
        var selectedEnv = $("#selectEnvironments option:selected" ).text();
        console.log("Selected env:" + selectedEnv);
        window.config.init(selectedEnv);
        App.login();
    });
});

var App = (function(){

  var self = {};

  self.init = function() {
    // Need to consider adding here some of the general initialization logic

  };

  self.areYouSure = function(text1, text2, button, callback) {
        $("#sure .sure-1").text(text1);
        $("#sure .sure-2").text(text2);
        $("#sure .sure-do").text(button).on("click.sure", function() {
            callback();
            $(this).off("click.sure");
        });
        $.mobile.changePage("#sure");
 };
    self.loadUserData = function() {
        if ((localStorage.getItem("RocketUserName") !== null) && (localStorage.getItem("RocketUserPassword") !== null))
        {
            $("#txtUserName").val(localStorage.getItem("RocketUserName"));
            $("#txtPassword").val(localStorage.getItem("RocketUserPassword"));
        }
    };

    self.login = function() {
        console.log("Login");
        $.mobile.showPageLoadingMsg('b','Authenticating...');
        var userName = $("#txtUserName").val();
        var password = $("#txtPassword").val();
        var loginApiCall = "http://" + config.apiDomain + "/" + config.rocketToolsApiPath + "/Login?Token=vegasuser&AppUserID=123&userName=" + userName +"&password=" + password;
        var response = $.getJSON( loginApiCall ,function( data ) {
            if (data.Data.Succeeded) {

                localStorage.setItem("RocketUserName", userName);
                localStorage.setItem("RocketUserPassword", password);

                self.init();
                self.MainPage.init();
                self.Monitoring.init();
                self.OnlineUsers.init();
                self.ManageServers.init();

                $.mobile.changePage("MainPage.html");
            }
            else {
                alert("Wrong user or password");
            }
            })
            .fail(function() {
                console.log( "Error in login process" );
                alert("Login process failed");
            })
            .complete (function(){
                $.mobile.hidePageLoadingMsg();
            })
    };
    return self;
}());





