//Will be used for creating instances of a player
function Player(data) {
	this.id 	= data.id;
	this.name 	= data.name;
	this.gender = data.gender;
	this.avatar = data.avatar;

	this.getId = function() {
		return this.id;
	}

	this.getName = function() {
		return this.name;
	};

	this.getGender = function() {
		return this.gender;
	};

	this.getAvatar = function() {
		return this.avatar;
	};
};

//Will contain all players
function Players() {
	this.players = [];

	this.addPlayer = function(player) {
		if(!(player instanceof Player)) return false;
		this.players.push(player);
		return true;
	};

	this.getPlayer = function(playerid) {
		if(isNaN(playerid)) return null;

		for(var i = 0; i<this.players.length;i++) {
			if(this.players[i].id == playerid) return this.players[i];
		}

		return null;
	};

	this.getPlayers = function() {
		return this.players;
	}
};

//Create instance of the function that will contain all instances of the players
var Players = new Players();