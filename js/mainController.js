'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MainController", function MainController($state, $mdSidenav) {
        var mainCtrl = this;


        mainCtrl.newArtist = function newArtist() {
        	$state.go("app.newArtist");
        };

        mainCtrl.goToHome = function goToHome() {
        	$state.go("app.home");
        };

        mainCtrl.showArtists = function showArtists() {
            $state.go("app.artists");
        };

        mainCtrl.addMusic = function addMusic() {
            $state.go("app.newMusic");
        };

        mainCtrl.showMusics = function showMusics() {
            $state.go("app.musics_details");
        };

        mainCtrl.searchArtist = function searchArtist() {
            $state.go("app.search_artist");
        };

        mainCtrl.toggle = function toggle() {
            $mdSidenav('left').toggle();
        };

    });
})();