'use strict';

(function() {
    var main = angular.module('main', [
        'ngMaterial',
        'ui.router'
    ]);

    main.config(function($stateProvider, $urlRouterProvider) {

         $urlRouterProvider.otherwise('/');

        $stateProvider
            .state("app", {
                abstract: true,
                views: {
                    main: {
                        templateUrl: "views/main.html",
                        controller: "MainController as mainCtrl"
                    }
                }
            })
            .state("app.home", {
                url: "/",
                views: {
                    content: {
                        templateUrl: "views/home.html",
                        controller: "HomeController as homeCtrl"
                    }
                }
            })
            .state("app.newArtist", {
                url: "/new_artist",
                views: {
                    content: {
                        templateUrl: "views/new_artist.html",
                        controller: "ArtistController as artistCtrl"
                    }
                }
            });
    });
})();