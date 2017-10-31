'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MainController", function MainController($state) {
        var mainCtrl = this;


        mainCtrl.newArtist = function newArtist() {
        	$state.go("app.newArtist");
        };

        mainCtrl.goToHome = function goToHome() {
        	$state.go("app.home");
        }

       
    });
})();