'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MusicController", function MusicController($state, StorageService) {
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
	    			var confirm = $mdDialog.confirm()
	                .clickOutsideToClose(true)
	                .title('Adicionar Música')
	                .textContent('Esse álbum já existe, deseja adicionar a música no álbum existente?.')
	                .ariaLabel('Adicionar Música')
	                .targetEvent(ev)
	                .ok('Adicionar')
	                .cancel('Cancelar');

		            $mdDialog.show(confirm).then(function ok() {
		                musicCtrl.user.addMusic(music);
		        		StorageService.showToast('Música adicionada com sucesso');
		            }, function cancel() {
		                MessageService.showToast('Cancelado');
		            });
        		} else {
        			musicCtrl.user.addMusic(music);
		        	StorageService.showToast('Música adicionada com sucesso');
        		}
        	}
        }
       
    });
})();