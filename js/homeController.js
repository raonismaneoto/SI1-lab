'use strict';

(function() {
    var app = angular.module("main");

    app.controller("HomeController", function HomeController($state, StorageService) {
        var homeCtrl = this;

        homeCtrl.user = StorageService.user;
        console.log(homeCtrl.user.artists);

        homeCtrl.goToTest = function goToTest() {
        	$state.go("app.test")
        }

        homeCtrl.vuvuzelaViado = function vuvuzelaViado() {
        	alert("deu a bunda");
        };
       
    });
})();