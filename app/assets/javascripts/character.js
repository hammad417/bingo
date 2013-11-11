//Add a function to the Object.Prototype to count the length
Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

//The character object for the animation
Character = {
	queue: [],

	table: {
		"start": {
			x: -100,
			y: 850
		},
		"entrance": {
			x: 150,
			y: 850,
			previous: "start"
		},

		// First row of tables
		1: {
			x: 270, y: 680,
			previous: "entrance",
			table: Tables.getTable(1)
		},

		2: {
			x: 620, y: 680,
			previous: 1,
			table: Tables.getTable(2)
		},
		3: {
			x: 970, y: 680,
			previous: 2,
			table: Tables.getTable(3)
		},
		4: {
			x: 1320, y: 680,
			previous: 3,
			table: Tables.getTable(4)
		},
		5: {
			x: 1670, y: 680,
			previous: 4,
			table: Tables.getTable(5)
		},

		//Second row of tables
		"begin2ndrow": {
			x: 230, y: 1000,
			previous: "entrance"
		},

		6: {
			x: 480, y: 1000,
			previous: "begin2ndrow",
			table: Tables.getTable(6)
		},

		7: {
			x: 830, y: 1000,
			previous: 6,
			table: Tables.getTable(7)
		},

		8: {
			x: 1180, y: 1000,
			previous: 7,
			table: Tables.getTable(8)
		},

		9: {
			x: 1530, y: 1000,
			previous: 8,
			table: Tables.getTable(9)
		},

		//Bottom row
		10: {
			x: 230, y: 1050,
			previous: "entrance"
		},

		11: {
			x: 580, y: 1050,
			previous: 10
		}
	},

	avatarPartsUrlBase: "/assets/character/",

	avatar: {
		male: {
			head: {
				0: { 
					front: { src: "/assets/character/male/0/front/head.png" },
					back: { src: "/assets/character/male/0/back/head.png" }
				}
			},

			body: {
				0: {
					front: {
						torso: { 
							standing: { src: "/assets/character/male/0/front/torso.png" },
							sitting: { src: "/assets/character/male/0/front/torso_sitting.png" }
						},
						arm: {
							left: { 
								standing: { src: "/assets/character/male/0/front/left_arm.png" },
								sitting: { 
									src: "/assets/character/male/0/front/left_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 0, y: 0 } 
									}
								}
							},
							right: { 
								standing: { src: "/assets/character/male/0/front/right_arm.png" },
								sitting: { src: "/assets/character/male/0/front/right_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 0, y: 0 } 
									}
								}
							}
						}
					}, 

					back: {
						torso: { 
							standing: { src: "/assets/character/male/0/back/torso.png" },
							sitting: { src: "/assets/character/male/0/back/torso_sitting.png" }
						},
						arm: {
							left: { 
								standing: { src: "/assets/character/male/0/back/left_arm.png" },
								sitting: { src: "/assets/character/male/0/back/left_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 0, y: 0 } 
									}
								}
							},
							right: { 
								standing: { src: "/assets/character/male/0/back/right_arm.png" },
								sitting: { src: "/assets/character/male/0/back/right_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 0, y: 0 } 
									}
								}
							}
						}
					}
				}
			},

			bottom: {
				0: {
					front: {
						leg: {
							left: {
								thigh: { src: "/assets/character/male/0/front/left_thigh.png" },
								shin: { src: "/assets/character/male/0/front/left_shin.png" }
							},

							right: {
								thigh: { src: "/assets/character/male/0/front/right_thigh.png" },
								shin: { src: "/assets/character/male/0/front/right_shin.png" }	
							}
						},

						foot: {
							left: { src: "/assets/character/male/0/front/left_foot.png"},
							right: { src: "/assets/character/male/0/front/right_foot.png"}
						}
					},

					back: {
						leg: {
							left: {
								thigh: { src: "/assets/character/male/0/back/left_thigh.png" },
								shin: { src: "/assets/character/male/0/back/left_shin.png" }
							},

							right: {
								thigh: { src: "/assets/character/male/0/back/right_thigh.png" },
								shin: { src: "/assets/character/male/0/back/right_shin.png" }	
							}
						},

						foot: {
							left: { src: "/assets/character/male/0/back/left_foot.png"},
							right: { src: "/assets/character/male/0/back/right_foot.png"}
						}
					}
				}
			}
		},

		female: {
			head: {
				0: { 
					front: {
						src: "/assets/character/female/0/front/head.png",
						offset: {
							x: 9,
							y: 5
						}
					},
					back: { src: "/assets/character/female/0/back/head.png" }
				}
			},

			body: {
				0: {
					front: {
						torso: { 
							standing: { src: "/assets/character/female/0/front/torso.png" },
							sitting: { src: "/assets/character/female/0/front/torso_sitting.png" }
						},
						arm: {
							left: { 
								standing: { src: "/assets/character/female/0/front/left_arm.png" },
								sitting: { src: "/assets/character/female/0/front/left_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 7, y: 0 } 
									}
								}
							},
							right: { 
								standing: { src: "/assets/character/female/0/front/right_arm.png" },
								sitting: { src: "/assets/character/female/0/front/right_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 0, y: 0 } 
									}
								}
							}
						}
					}, 

					back: {
						torso: { 
							standing: { src: "/assets/character/female/0/back/torso.png" },
							sitting: { src: "/assets/character/female/0/back/torso_sitting.png" }
						},

						arm: {
							left: { 
								standing: { src: "/assets/character/female/0/back/left_arm.png" },
								sitting: { 
									src: "/assets/character/female/0/back/left_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 7, y: 0 } 
									}
								}
							},
							right: { 
								standing: { src: "/assets/character/female/0/back/right_arm.png" },
								sitting: { src: "/assets/character/female/0/back/right_arm_sitting.png", 
									offset: {
										left: { x: 0, y: 0 },
										right: { x: 0, y: 0 } 
									}
								}
							}
						}
					}
				}
			},

			bottom: {
				0: {
					front: {
						leg: {
							left: {
								thigh: { src: "/assets/character/female/0/front/left_thigh.png" },
								shin: { src: "/assets/character/female/0/front/left_shin.png" }
							},

							right: {
								thigh: { src: "/assets/character/female/0/front/right_thigh.png" },
								shin: { 
									src: "/assets/character/female/0/front/right_shin.png",
									offset: {
										x: -3,
										y: 0
									} 
								}	
							}
						},

						foot: {
							left: { 
								src: "/assets/character/female/0/front/left_foot.png",
								offset: {
									x: 1,
									y: -4
								}
							},
							right: { src: "/assets/character/female/0/front/right_foot.png",
								offset: {
									x: 1,
									y: -4
								}
							}
						}
					},

					back: {
						leg: {
							left: {
								thigh: { src: "/assets/character/female/0/back/left_thigh.png" },
								shin: { src: "/assets/character/female/0/back/left_shin.png" }
							},

							right: {
								thigh: { src: "/assets/character/female/0/back/right_thigh.png" },
								shin: { src: "/assets/character/female/0/back/right_shin.png" }	
							}
						},

						foot: {
							left: { src: "/assets/character/female/0/back/left_foot.png"},
							right: { src: "/assets/character/female/0/back/right_foot.png"}
						}
					}
				}
			}
		},	
	}
};

Character.getFirstTableFromRowByTableId = function(tableid, raw) {
	if(!raw) var raw = false;

	var points 	= [];
	var temp 	= Character.moveTo(tableid, [], true);

	for(var i=0;i<temp.length;i++) {
		if(raw === true) {
			points.push(temp[i]);
		} else {
			points.push([temp[i].x, temp[i].y]);
		}

		if(temp[i].previous != undefined) {
			if(temp[i].previous == "entrance") {
				//We got a winner.
				break;
			}
		}
	}

	return points;
};

Character.moveTo = function(tableid, points, raw) {
	if(!raw) var raw = false;

	//Check if previous step exists and is valid
	if(Character.table[tableid].previous != undefined && Character.table[tableid].previous != null) {
		points.concat(Character.moveTo(Character.table[tableid].previous, points, raw));
	}

	if(raw === true) {
		points.push(Character.table[tableid]);
	} else {
		points.push([Character.table[tableid].x, Character.table[tableid].y]);
	}

	return points;
};

Character.setImage = function(object, item, callback) {
	var newImg = new Image();

	object.css({
		top: "",
		left: ""
	});

	object.css("background-image", 'url('+item.src+')');

    newImg.onload = function() {
      var height = newImg.height;
      var width = newImg.width;

      object.css({
      	width: width + "px",
      	height: height + "px"
      });

      if(item.offset != undefined) {
      	var x = object.css('left');
      	var y = object.css('top');

      	x = parseInt(x.substring(0, x.length - 2));
      	y = parseInt(y.substring(0, y.length - 2));

      	x = isNaN(x) ? 0 : x;
      	y = isNaN(y) ? 0 : y;

	    if(item.offset.x < 0 || item.offset.x > 0) x = x + item.offset.x;
	    if(item.offset.y < 0 || item.offset.y > 0) y = y + item.offset.y;

	    object.css({
	    	left: x,
	    	top: y,
	    	position: 'absolute'
	    });
	  }

      callback(true);
    }

    newImg.src = item.src; // this must be done AFTER setting onload
}

Character.createCharacter = function(userid) {
	var player = Players.getPlayer(userid);
	var gender = player.getGender();
	var avatar = player.getAvatar();
	var direction = "front";

	//Create character
	$("#players").append('<div class="character" data-playerid="'+userid+'">\
							<div class="head"></div>\
							<div class="torso">\
								<div class="left leg"><div class="left thigh"><div class="left shin"><div class="left foot"></div></div></div></div>\
								<div class="right leg"><div class="right thigh"><div class="right shin"><div class="right foot"></div></div></div></div>\
								<div class="left arm"><div class="left bicep"></div></div>\
								<div class="right arm"><div class="right bicep"></div></div>\
							</div>\
						</div>');

	//Applying custom clothing
	Character.setImage($(".character[data-playerid="+userid+"] .head"), 							Character.avatar[gender].head[avatar.head][direction], function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso"), 							Character.avatar[gender].body[avatar.body][direction].torso.standing, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .left.arm .left.bicep"), 		Character.avatar[gender].body[avatar.body][direction].arm.left.standing, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .right.arm .right.bicep"), 	Character.avatar[gender].body[avatar.body][direction].arm.right.standing, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .left.leg .left.thigh"), 		Character.avatar[gender].bottom[avatar.bottom][direction].leg.left.thigh, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .left.leg .left.shin"), 		Character.avatar[gender].bottom[avatar.bottom][direction].leg.left.shin, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .left.leg .left.foot"),		Character.avatar[gender].bottom[avatar.bottom][direction].foot.left, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .right.leg .right.thigh"), 	Character.avatar[gender].bottom[avatar.bottom][direction].leg.right.thigh, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .right.leg .right.shin"), 	Character.avatar[gender].bottom[avatar.bottom][direction].leg.right.shin, function(){
	Character.setImage($(".character[data-playerid="+userid+"] .torso .right.leg .right.foot"), 	Character.avatar[gender].bottom[avatar.bottom][direction].foot.right, function(){
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

}

Character.goToTable = function(tableid, userid) {
	//Prevent errors if the player doesn't exist
	if(Players.getPlayer(userid) == null) return false;

	Character.createCharacter(userid);

	var $points 	= Character.moveTo(tableid, []);
	var $moveToRow 	= Character.getFirstTableFromRowByTableId(tableid);
	var $start 		= Character.moveTo("entrance", []);

	if(($points.length - ($moveToRow.length-1)) >= 2) {
		$points.splice(0, $moveToRow.length-1);
		$moveToRow.splice(0, $start.length-1);
	} else {
		$moveToRow = false;
		$points.splice(0, $start.length-1);
	}
	
	var moveToRow = function() {
		var speed 	= $points.length * ((tableid > 9) ? 1000: 600);
		var spline 	= $.crSpline.buildSequence($moveToRow);
		$(".character[data-playerid="+userid+"]").animate({ crSpline: spline }, speed, "linear", toTheTable);
	}

	var toTheTable = function() {
		if(tableid > 5) $(".character[data-playerid="+userid+"]").css("z-index", 15);

		var speed 	= $points.length * (($moveToRow === false) ? 1000 : 3000);
		var spline 	= $.crSpline.buildSequence($points);
		$(".character[data-playerid="+userid+"]").animate({ crSpline: spline }, speed, "linear", function() {

			//Let the player sit at the table
			Tables.getTable(tableid).addPlayer(Players.getPlayer(userid));

			//Remove the walking character
			$(this).fadeOut(300, function() {
				$(this).remove();	
			});
		});
	};

	var speed 	= $start.length * 2000;
	var spline 	= $.crSpline.buildSequence($start);
	$(".character[data-playerid="+userid+"]").animate({ crSpline: spline }, speed, "linear", (($moveToRow === false) ? toTheTable : moveToRow));
};

Character.newPlayer = function(tableid, userid) {
	Character.queue.push({ tableid: tableid, userid: userid });
}

Character.checkQueue = function() {
	if(Character.queue.length > 0) {
		var player = Character.queue.shift();
		Character.goToTable(player.tableid, player.userid);
	}
}

$(document).ready(function(){
	//Check queue every 4 seconds to see if there are players waiting
	setInterval(function(){
		Character.checkQueue();
	}, 4000);
});