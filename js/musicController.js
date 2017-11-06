'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MusicController", function MusicController($state, StorageService, $mdDialog) {
        var musicCtrl = this;

        musicCtrl.user = StorageService.user;

        musicCtrl.addMusic = function addMusic(ev) {
        	var data = {name: musicCtrl.name, 
        		artist: musicCtrl.artist, 
        		album: musicCtrl.album, 
        		releaseYear: musicCtrl.releaseYear,
        		duration: musicCtrl.duration
        	};
        	var music = new Music(data);
        	if(!music.isValid()) {
        		StorageService.showToast('Campos obrigatórios não preenchidos corretamente');
        	} else {
        		var album = musicCtrl.user.findAlbum(music.album);
        		if (album) {
	    			musicCtrl.showConfirmDialog(music, ev);
        		} else {
        			musicCtrl.user.addMusic(music);
		        	StorageService.showToast('Música adicionada com sucesso');
        		}
        	}
            clearFields();
        };

        musicCtrl.showConfirmDialog = function showConfirmDialog(music, ev) {
            var confirm = $mdDialog.confirm()
            .clickOutsideToClose(true)
            .title('Adicionar Música')
            .textContent('Esse álbum já existe, deseja adicionar a música no álbum existente?.')
            .ariaLabel('Adicionar Música')
            .targetEvent(ev)
            .ok('Adicionar')
            .cancel('Cancelar');

            $mdDialog.show(confirm).then(function ok() {
                var result = musicCtrl.user.addMusic(music);
                if (result) {
                    StorageService.showToast('Música adicionada com sucesso');
                } else {
                    StorageService.showToast('Música já existente no álbum');
                }
                
            }, function cancel() {
                StorageService.showToast('Cancelado');
            });
        };

        musicCtrl.hasAlbum = function () {
            return !_.isEmpty(musicCtrl.user.albuns);
        };

        function clearFields() {
            musicCtrl.name = "";
            musicCtrl.artist = "";
            musicCtrl.album = "";
            musicCtrl.releaseYear = "";
            musicCtrl.duration = "";
        }
    });
})();