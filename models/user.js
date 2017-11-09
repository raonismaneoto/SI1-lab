"use strict";

function User() {
	this.artists = [];
	this.albuns = [];
	this.favoriteArtists = [];
	this.playLists = [];
}

User.prototype.addArtist = function addArtist(artistToAdd) {
	this.artists.push(artistToAdd);
};

User.prototype.addPlayList = function addPlayList(playList) {
	var thereIsTheSamePl = _.find(this.playLists, playList);
	if(thereIsTheSamePl) {
		return false;
	} else {
		this.playLists.push(playList);
		return true;
	}
};

User.prototype.removePlayList = function removePlayList(playList) {
	_.remove(this.playLists, playList);
};

User.prototype.addMusic = function addMusic(music) {
	var album = this.findAlbum(music.album)
	if (album) {
		var worked = album.addMusic(music);
		return worked;
	} else {
		var data = {name: music.album, musics: [music]};
		var newAlbum = new Album(data);
		this.albuns.push(newAlbum);
	}
};

User.prototype.findAlbum = function findAlbum(name) {
	var album = _.find(this.albuns, function(currentAlbum) {
		return currentAlbum.name === name;
	});
	return album;
};

User.prototype.addFavorite = function addFavorite(artist) {
	if(!_.includes(this.favoriteArtists, artist)) {
		this.favoriteArtists.push(artist);
	}
};

User.prototype.removeFavorite = function removeFavorite(artist) {
	_.remove(this.favoriteArtists, function(currentArtist) {
		return currentArtist.name === artist.name;
	});
};