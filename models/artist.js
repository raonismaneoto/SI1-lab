"use strict";

function Artist(data) {
	_.extend(this, data);
}

Artist.prototype.addLastMusicListenned = function addLastMusicListenned(music) {
	this.lastMusicListenned = music;
};

Artist.prototype.addAlbum = function addAlbum(album) {
	if(!_.includes(this.albuns, album)){
		this.albuns.push(album);
	}
};