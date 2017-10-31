"use strict";

function User() {
	this.artists = [];
}

User.prototype.addArtist = function addArtist(artistToAdd) {
	this.artists.push(artistToAdd);
}