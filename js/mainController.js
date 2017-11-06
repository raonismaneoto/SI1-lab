'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MainController", function MainController($state, $mdSidenav) {
        var mainCtrl = this;

        mainCtrl.message = "Musicoteca";


        mainCtrl.newArtist = function newArtist() {
        	$state.go("app.newArtist");
            mainCtrl.message = "Adicionar Artista";
        };

        mainCtrl.goToHome = function goToHome() {
        	$state.go("app.home");
            mainCtrl.message = "Musicoteca";
        };

        mainCtrl.showArtists = function showArtists() {
            $state.go("app.artists");
            mainCtrl.message = "Artistas";
        };

        mainCtrl.addMusic = function addMusic() {
            $state.go("app.newMusic");
            mainCtrl.message = "Adicionar Música";
        };

        mainCtrl.showMusics = function showMusics() {
            $state.go("app.musics_details");
            mainCtrl.message = "Músicas";
        };

        mainCtrl.searchArtist = function searchArtist() {
            $state.go("app.search_artist");
            mainCtrl.message = "Artistas";
        };

        mainCtrl.toggle = function toggle() {
            $mdSidenav('left').toggle();
        };

    });
})();