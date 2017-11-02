'use strict';

(function() {
    var app = angular.module("main");

    app.controller("ArtistController", function ArtistController($state, StorageService, $mdToast, $mdDialog) {
        var artistCtrl = this;

        artistCtrl.user = StorageService.user;

        artistCtrl.addArtist = function addArtist() {
        	if(artistCtrl.name) {
	        	var data = {name: artistCtrl.name, image: artistCtrl.image};
	        	var artist = new Artist(data);
	        	var thereIsAnArtistWithSameName = _.find(artistCtrl.user.artists, function(currentArtist) {
	        		return currentArtist.name === artist.name;
	        	});
	        	if(thereIsAnArtistWithSameName) {
	        		showToast('Artista já existente no sistema.');
	        	} else {
	        		artistCtrl.user.addArtist(artist);
	        		showToast('Artista adicionado com sucesso');
	        		artistCtrl.name = "";
	        	}
        	} else {
        		showToast("O nome do artista é obrigatório");
        	}
        };

        artistCtrl.showArtistDetails = function showArtistDetails(artist, ev) {
            $mdDialog.show({
                controller: function DialogController(artist) {this.artist = artist},
                controllerAs: "controller",
                templateUrl: 'views/artist_details.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: {
                    artist: artist
                }
            });
        };

        artistCtrl.hasArtists = function hasArtists() {
            return !_.isEmpty(artistCtrl.user.artists);
        }

        function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .action('FECHAR')
                    .highlightAction(true)
                    .hideDelay(5000)
                    .position('bottom right')
            );
        }
       
    });
})();