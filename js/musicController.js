'use strict';

(function() {
    var app = angular.module("main");

    app.controller("MusicController", function MusicController($state, StorageService, $mdDialog, $mdPanel) {
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
            var hasThisArtist = musicCtrl.user.findArtist(music.artist);
            if(!hasThisArtist) {
                var artist = new Artist(
                    {name: musicCtrl.artist, 
                    albuns: [new Album(
                        {name: musicCtrl.album, 
                        musics: [music]
                        })]
                    }
                );
            }
        	if(!music.isValid()) {
        		StorageService.showToast('Campos obrigatórios não preenchidos corretamente');
        	} else {
        		var album = musicCtrl.user.findAlbum(music.album);
        		if (album) {
                    if(!hasThisArtist) {
                        musicCtrl.showConfirmDialog(music, ev, artist);
                    } else {
                        var result = musicCtrl.showConfirmDialog(music, ev);
                        if (result)
                            hasThisArtist.addAlbum(new Album(
                                {name: musicCtrl.album, 
                                musics: [music]
                                })
                            );
                    }
        		} else {
        			musicCtrl.user.addMusic(music);
                    if(!hasThisArtist)
                        musicCtrl.user.addArtist(artist);
                    else
                        hasThisArtist.addAlbum(new Album(
                            {name: musicCtrl.album, 
                            musics: [music]
                            })
                        )
		        	StorageService.showToast('Música adicionada com sucesso');
        		}
        	}
            clearFields();
        };

        musicCtrl.showConfirmDialog = function showConfirmDialog(music, ev, artist) {
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
                    if(artist)
                        musicCtrl.user.addArtist(artist);
                    StorageService.showToast('Música adicionada com sucesso');
                    return true;
                } else {
                    StorageService.showToast('Música já existente no álbum');
                    return false;
                }
                
            }, function cancel() {
                StorageService.showToast('Cancelado');
            });
        };

        musicCtrl.hasAlbum = function () {
            return !_.isEmpty(musicCtrl.user.albuns);
        };


        musicCtrl.hasPlayLists = function hasPlayLists() {
            return !_.isEmpty(musicCtrl.user.playLists);
        }

        musicCtrl.availablePlayList = function availablePlayList(music, playList) {
            return _.includes(playList.musics, music);
        };

        musicCtrl.addPlayList = function addPlayList(music, playList) {
            var result = playList.addMusic(music);
            if(result) {
                StorageService.showToast("Música adicionada à " + playList.name + " com sucesso.");
            } else {
                StorageService.showToast("Já tem uma música com esse nome em " + playList.name);
            }
        };

        musicCtrl.removePlayList = function removePlayList(music, playList) {
            playList.removeMusic(music);
            StorageService.showToast(music.name + " removida de " + playList.name);
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