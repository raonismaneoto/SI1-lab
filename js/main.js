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
            })
            .state("app.artists", {
                url: "/artists",
                views: {
                    content: {
                        templateUrl: "views/artists.html",
                        controller: "ArtistController as artistCtrl"
                    }
                }
            })
            .state("app.newMusic", {
                url: "/new_music",
                views: {
                    content: {
                        templateUrl: "views/new_music.html",
                        controller: "MusicController as musicCtrl"
                    }
                }
            })
            .state("app.musics_details", {
                url: "/musics_details",
                views: {
                    content: {
                        templateUrl: "views/musics.html",
                        controller: "MusicController as musicCtrl"
                    }
                }
            })
            .state("app.search_artist", {
                url: "/search_artist",
                views: {
                    content: {
                        templateUrl: "views/search_artist.html",
                        controller: "ArtistController as artistCtrl"
                    }
                }
            });
    });
})();