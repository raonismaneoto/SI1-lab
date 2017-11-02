"use strict";

function User() {
	this.artists = [];
	this.albuns = [];
}

User.prototype.addArtist = function addArtist(artistToAdd) {
	this.artists.push(artistToAdd);
};

User.prototype.addMusic = function addMusic(music) {
	var album = this.findAlbum(music.album.name)
	if (album) {
		var worked = album.addMusic(music);
		return worked;
	} else {
		var data = {name: music.album, musics: [music]};
		var newAlbum = new Album(data);
	}
};

User.prototype.findAlbum = function findAlbum(name) {
	var album = _.find(this.albuns, function(currentAlbum) {
		return currentAlbum === name;
	});
	return album;
};