'use strict';


(function() {
	var app = angular.module("main");

	app.controller("PlayListController", function(StorageService, $mdDialog) {
		var plCtrl = this;
		plCtrl.user = StorageService.user;

		plCtrl.addPlayList = function addPlayList() {
			var currentPlayList = new PlayList({name: plCtrl.name});
			var result = plCtrl.user.addPlayList(currentPlayList);
			if(!result) {
				StorageService.showToast("Uma playlist com esse nome já existe.");
			} else {
				StorageService.showToast("PlayList criada com sucesso");
			}
		};

		plCtrl.removePlayList = function removePlayList(playList, ev) {
			var confirm = $mdDialog.confirm()
            .clickOutsideToClose(true)
            .title('Remover playList')
            .textContent('Você removerá ' + playList.name + " das suas playlists")
            .ariaLabel('Remover playlist')
            .targetEvent(ev)
            .ok('Remover')
            .cancel('Cancelar');

            $mdDialog.show(confirm).then(function ok() {
                plCtrl.user.removePlayList(playList);
                StorageService.showToast("Playlist removida com sucesso.");
            }, function cancel() {
                StorageService.showToast('Cancelado');
            });
		};

		plCtrl.hasPlayLists = function hasPlayLists() {
			return !_.isEmpty(plCtrl.user.playLists);
		};

		plCtrl.showDetails = function showDetails(playList, ev) {
			if(!_.isEmpty(playList.musics)) {
				$mdDialog.show({
	                controller: PlayListDetailsCtrl,
	                controllerAs: "controller",
	                templateUrl: 'views/playList_dialog.html',
	                parent: angular.element(document.body),
	                targetEvent: ev,
	                clickOutsideToClose:true,
	                locals: {
	                    playList: playList
	                }
            	});
			} else {
				StorageService.showToast('Essa playList ainda não possui músicas.');
			}
			
		};

		function PlayListDetailsCtrl(playList) {
			var plDetCtrl = this;
			plDetCtrl.playList = playList;

			plDetCtrl.removeMusic = function removeMusic(music, ev) {
				var confirm = $mdDialog.confirm()
	            .clickOutsideToClose(true)
	            .title('Remover música')
	            .textContent('Você removerá ' + music.name + " da sua playlist")
	            .ariaLabel('Remover música')
	            .targetEvent(ev)
	            .ok('Remover')
	            .cancel('Cancelar');

	            $mdDialog.show(confirm).then(function ok() {
	                plDetCtrl.playList.removeMusic(music);
					StorageService.showToast("Música removida com sucesso.");
	            }, function cancel() {
	                StorageService.showToast('Cancelado');
	            });
				
			};
		}


	});

})();