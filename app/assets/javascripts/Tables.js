//Will be used for creating instances of a table
function Table(tableid) {
	this.tableid = tableid;
	this.players = [];

	this.drawCanvasImage = function(data, callback) {
		var options = $.extend({
			canvas: null,
			source: '',
			x: 0,
			y: 0,
			scaleX: 1,
			rotate: 0,
			groups: []
		}, data);

		if(options.canvas == null || data.source == '') {
			callback(false);
			return false;
		}

		$(data.canvas).drawImage({
			source: options.source,
			groups: options.groups,
			x: options.x,
			y: options.y,
			scaleX: options.scaleX,
			rotate: options.rotate,
			fromCenter: false,
			load: callback
		});
	}

	this.hasFreeSpot = function() {
		if(Object.size(this.players) < 4) return false;
		return true;
	};

	this.getPlayers = function() {
		return this.players;
	};

	this.addPlayer = function(player) {
		if(this.hasFreeSpot()) return false;
		this.players.push(player);
		this.drawTable();
		return true;
	};

	this.drawTable = function() {
		var canvas = $("canvas.table[data-table="+this.tableid+"]");
		if(canvas.length < 1) return false;

		//Set width/height properties for the canvas
		canvas.attr({
			width: 309,
			height: 380
		});

		var players = this.getPlayers();

		canvas.clearCanvas();

		var tablemethod = this;

		//===============
		// Top part
		//==============
		canvas.drawImage({
			canvas: canvas,
			source: "/assets/empty-table.png",
			x: 0, y: 90,
			fromCenter: false,
			width: 309,
			height: 290,
			load: function(){
				if(players.length > 0) {
					tablemethod.drawPlayerTopLeftBeforeTable(canvas, players[0], function() {
						if(players.length > 1) {
							tablemethod.drawPlayerTopRightBeforeTable(canvas, players[1], function() {
								tablemethod.drawTableStep2(canvas);
							});
						} else {
							tablemethod.drawTableStep2(canvas);
						}
					});
				}
			}
		});

		return true;
	};

	this.drawTableStep2 = function(canvas) {
		var tablemethod = this;
		var players = this.getPlayers();

		//===============
		// Middle part
		//==============
		//Draw cards on the table because there are players
		this.drawCanvasImage({
			canvas: canvas,
			source: "/assets/table_overlay.png",
			x: 55, y: 163,
			fromCenter: false
		}, function() {
			tablemethod.drawCanvasImage({
				canvas: canvas,
				source: "/assets/table-cards.png",
				x: 115, y: 185,
				name: "lastlayer",
				fromCenter: false,
				width: 82,
				height: 31
			}, function() {
				//===============
				// Bottom part
				//==============
				tablemethod.drawPlayerTopLeftAfterTable(canvas, players[0], function(){
					if(players.length > 1) { 
						tablemethod.drawPlayerTopRightAfterTable(canvas, players[1], function() {
							if(players.length > 2) { 
								tablemethod.drawPlayerBottomLeftAfterTable(canvas, players[2], function(){
									if(players.length > 3) { 
										tablemethod.drawPlayerBottomRightAfterTable(canvas, players[3], function(){
											tablemethod.drawTableStep3(canvas);
										});
									} else {
										tablemethod.drawTableStep3(canvas);
									}
								}); 
							} else {
								tablemethod.drawTableStep3(canvas);
							}
						}); 
					} else {
						tablemethod.drawTableStep3(canvas);
					}
				});
			});
		});
	};

	this.drawTableStep3 = function(canvas) {
		var tablesmethod = this;

		this.drawCanvasImage({
			canvas: canvas,
			source: "/assets/chair_overlay.png",
			x: 0, y: 212, fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({
			canvas: canvas,
			source: "/assets/chair_overlay.png",
			x: 195, y: 213, fromCenter: false, scaleX: -1
		}, function(){
			return true;
		});
		});
	}

	/** 
	 * TOP LEFT player
	 */
	this.drawPlayerTopLeftBeforeTable = function(canvas, player, callback) {
		var avatar = player.getAvatar();
		var gender = player.getGender();
		var tablesmethod = this;

		this.drawCanvasImage({ //Left foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].foot.left.src,
			groups: ['tableplayer'+player.getId()],
			x: 98, y: 245, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Right foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].foot.right.src,
			groups: ['tableplayer'+player.getId()],
			x: 90, y: 255, fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Left shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.left.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 95, y: 193, fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Right shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.right.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 85, y: 203, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Left thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.left.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 75, y: 150, rotate: 320, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Right thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.right.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 60, y: 150, rotate: 315, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Torso
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["front"].torso.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: 35, y: 70, fromCenter: false
		}, function() {
			callback(true);
		});
		});
		});
		});
		});
		});
		});
	};

	this.drawPlayerTopLeftAfterTable = function(canvas, player, callback) {
		var avatar = player.getAvatar();
		var gender = player.getGender();

		var tablesmethod = this;

		this.drawCanvasImage({ //Left arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["front"].arm.left.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (83 + Character.avatar[gender].body[avatar.body]["front"].arm.left.sitting.offset.left.x) , y: (95 + Character.avatar[gender].body[avatar.body]["front"].arm.left.sitting.offset.left.y), fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Right arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["front"].arm.right.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (30 + Character.avatar[gender].body[avatar.body]["front"].arm.right.sitting.offset.left.x), y: (100 + Character.avatar[gender].body[avatar.body]["front"].arm.right.sitting.offset.left.y), fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Head
			canvas: canvas,
			source: Character.avatar[gender].head[avatar.head]["front"].src,
			groups: ['tableplayer'+player.getId()],
			x: 35, y: 20, fromCenter: false
		}, function(){
			callback(true);
		});
		});
		});
	};

	/** 
	 * TOP RIGHT player
	 */
	this.drawPlayerTopRightBeforeTable = function(canvas, player, callback) {
		var avatar = player.getAvatar();
		var gender = player.getGender();
		var tablesmethod = this;

		this.drawCanvasImage({ //Left foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].foot.left.src,
			groups: ['tableplayer'+player.getId()],
			x: 165, y: 245, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Right foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].foot.right.src,
			groups: ['tableplayer'+player.getId()],
			x: 173,  y: 255, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Left shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.left.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 180, y: 193, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Right shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.right.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 190, y: 203, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Left thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.left.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 220, y: 150, rotate: -320, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Right thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["front"].leg.right.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 205, y: 150, rotate: -315, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Torso
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["front"].torso.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: 205, y: 70, fromCenter: false, scaleX: -1
		}, function(){
			callback(true);
		});
		});
		});
		});
		});
		});
		});
	};

	this.drawPlayerTopRightAfterTable = function(canvas, player, callback) {
		var avatar = player.getAvatar();
		var gender = player.getGender();
		var tablesmethod = this;

		this.drawCanvasImage({ //Left arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["front"].arm.left.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (161 + Character.avatar[gender].body[avatar.body]["front"].arm.left.sitting.offset.right.x), y: (95 + Character.avatar[gender].body[avatar.body]["front"].arm.left.sitting.offset.right.y), fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Right arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["front"].arm.right.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (205 + Character.avatar[gender].body[avatar.body]["front"].arm.right.sitting.offset.right.x), y: (96 + Character.avatar[gender].body[avatar.body]["front"].arm.right.sitting.offset.right.y), fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Head
			canvas: canvas,
			source: Character.avatar[gender].head[avatar.head]["front"].src,
			groups: ['tableplayer'+player.getId()],
			x: 205, y: 20, fromCenter: false, scaleX: -1
		}, function(){
			callback(true);
		});
		});
		});
	};

	/** 
	 * BOTTOM LEFT player
	 */
	this.drawPlayerBottomLeftAfterTable = function(canvas, player, callback) {
		var avatar = player.getAvatar();
		var gender = player.getGender();

		var tablesmethod = this;

		this.drawCanvasImage({ //Right foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].foot.right.src,
			groups: ['tableplayer'+player.getId()],
			x: 113, y: 314, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Left foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].foot.left.src,
			groups: ['tableplayer'+player.getId()],
			x: 121, y: 323, fromCenter: false, scaleX: -1
		}, function() {
		tablesmethod.drawCanvasImage({ //Right shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.right.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 103, y: 265, rotate: -10, fromCenter: false, scaleX: -1
		}, function() {
		tablesmethod.drawCanvasImage({ //Left shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.left.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 115, y: 265, rotate: -10, fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Right thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.right.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 60, y: 245, rotate: 260, fromCenter: false, scaleX: -1
		}, function() {
		tablesmethod.drawCanvasImage({ //Left thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.left.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 75, y: 235, rotate: 260, fromCenter: false, scaleX: -1
		}, function() {
		tablesmethod.drawCanvasImage({ //Right arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["back"].arm.right.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (30 + Character.avatar[gender].body[avatar.body]["back"].arm.right.sitting.offset.left.x), y: (185 + Character.avatar[gender].body[avatar.body]["back"].arm.right.sitting.offset.left.y), fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Torso
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["back"].torso.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: 35, y: 160, fromCenter: false, scaleX: -1
		}, function() {
		tablesmethod.drawCanvasImage({ //Left arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["back"].arm.left.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (83 + Character.avatar[gender].body[avatar.body]["back"].arm.left.sitting.offset.left.x), y: (195 + Character.avatar[gender].body[avatar.body]["back"].arm.left.sitting.offset.left.y), fromCenter: false, scaleX: -1
		}, function(){
		tablesmethod.drawCanvasImage({ //Head
			canvas: canvas,
			source: Character.avatar[gender].head[avatar.head]["back"].src,
			groups: ['tableplayer'+player.getId()],
			x: 35, y: 108, fromCenter: false, scaleX: -1
		}, function(){
			callback(true);
		});
		});
		});
		});
		});
		});
		});
		});
		});
		});
	};

	/** 
	 * BOTTOM LEFT player
	 */
	this.drawPlayerBottomRightAfterTable = function(canvas, player, callback) {
		var avatar = player.getAvatar();
		var gender = player.getGender();

		var tablesmethod = this;

		this.drawCanvasImage({ //Right foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].foot.right.src,
			groups: ['tableplayer'+player.getId()],
			x: 168, y: 314, fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Left foot
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].foot.left.src,
			groups: ['tableplayer'+player.getId()],
			x: 165, y: 323, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Right shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.right.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 195, y: 265, rotate: 5, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Left shin
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.left.shin.src,
			groups: ['tableplayer'+player.getId()],
			x: 185, y: 263, rotate: 5, fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Right thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.right.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 215, y: 250, rotate: -260, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Left thigh
			canvas: canvas,
			source: Character.avatar[gender].bottom[avatar.bottom]["back"].leg.left.thigh.src,
			groups: ['tableplayer'+player.getId()],
			x: 210, y: 240, rotate: -260, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Right arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["back"].arm.right.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (228 + Character.avatar[gender].body[avatar.body]["back"].arm.right.sitting.offset.right.x), y: (195 + Character.avatar[gender].body[avatar.body]["back"].arm.right.sitting.offset.right.y), fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Torso
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["back"].torso.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: 215, y: 160, fromCenter: false
		}, function() {
		tablesmethod.drawCanvasImage({ //Left arm
			canvas: canvas,
			source: Character.avatar[gender].body[avatar.body]["back"].arm.left.sitting.src,
			groups: ['tableplayer'+player.getId()],
			x: (162 + Character.avatar[gender].body[avatar.body]["back"].arm.left.sitting.offset.right.x), y: (195 + Character.avatar[gender].body[avatar.body]["back"].arm.left.sitting.offset.right.y), fromCenter: false
		}, function(){
		tablesmethod.drawCanvasImage({ //Head
			canvas: canvas,
			source: Character.avatar[gender].head[avatar.head]["back"].src,
			groups: ['tableplayer'+player.getId()],
			x: 215, y: 108, fromCenter: false
		}, function(){
			callback(true);
		});
		});
		});
		});
		});
		});
		});
		});
		});
		});
	};

	this.drawTable();
};


//Will contain all tables
function Tables() {
	this.tables = [];

	this.addTable = function(table) {
		if(!(table instanceof Table)) return false;
		this.tables.push(table);
		return true;
	};

	this.getTable = function(tableid) {
		tableid = tableid - 1; //Because its an array the index starts at 0 instead of 1
		if(this.tables[tableid] == undefined) return null;
		return this.tables[tableid];
	};

	this.getTables = function() {
		return this.tables;
	}
};

//Create instance of the function that will contain all instances of the tables
var Tables = new Tables();