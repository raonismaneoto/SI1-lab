'use strict';

(function() {
    var app = angular.module("main");

    app.controller("HomeController", function HomeController($state, StorageService) {
        var homeCtrl = this;

        homeCtrl.user = StorageService.user;
       
    });
})();