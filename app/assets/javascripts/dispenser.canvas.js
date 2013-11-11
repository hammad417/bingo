/*
  var context;
  var x = 209;
  var y = 208;

  function Ball(imagesource, radius, dx, dy) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.radius = radius;
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.imagesource = imagesource;
  }

  Ball.prototype.Create = function () {
      var img = new Image;
      img.src = this.imagesource;
      this.context.drawImage(img, this.dx, this.dy);
  }

  Ball.prototype.Bounce = function () {
      if (this.x >= (canvas.width - this.radius) || this.x <= this.radius) this.dx *= -1;
      if (this.y >= (canvas.height - this.radius) || this.y <= this.radius) this.dy *= -1;
  }

  function init() {
  		$("#dispenser_spinnerbox_canvas").attr({
							width: $("#dispenser_spinnerbox_canvas").width()+"px",
							height: $("#dispenser_spinnerbox_canvas").height()+"px"
						});

      canvas = document.getElementById("dispenser_spinnerbox_canvas")
      context = canvas.getContext('2d');
      // Create an arry to store the balls info
      balls = [];

      balls.push(new Ball('/assets/dispenser_blue_ball_small.png', 37, 6, 9));
      balls.push(new Ball('/assets/dispenser_blue_ball_small.png', 37, 6, 9));
      balls.push(new Ball('/assets/dispenser_blue_ball_small.png', 37, 6, 9));
      balls.push(new Ball('/assets/dispenser_blue_ball_small.png', 37, 6, 9));
      balls.push(new Ball('/assets/dispenser_blue_ball_small.png', 37, 6, 9));

      setInterval(draw, 18);
  }

  function draw() {
      context.clearRect(0, 0, 209, 208);

      for (i in balls) {
          balls[i].x += balls[i].dx;
          balls[i].y += balls[i].dy;
          // Boundary checking
          balls[i].Bounce();
          balls[i].Create();
      }
  }

  init();
*/

(function ( $ ) {
	$.fn.bingoDispenser = function(options) {
		var balls = {
			small: {
				blue: 	'/assets/dispenser_blue_ball_small.png',
				green: 	'/assets/dispenser_green_ball_small.png',
				red: 	'/assets/dispenser_red_ball_small.png',
				purple: '/assets/dispenser_purple_ball_small.png'
			},
			large: {

			}
		};

		Object.size = function(obj) {
			var size = 0, key;
			for (key in obj) {
				if (obj.hasOwnProperty(key)) size++;
			}
			return size;
		};

		var settings = $.extend({
			// These are the defaults.
			element: null,
			canvas: "canvas",
			dispenseBall: function(data) {}
		}, options );

		//Initialize
		settings.element = this;

		$(settings.element.find(settings.canvas)).attr({
							width: $(settings.element.find(settings.canvas)).width()+"px",
							height: $(settings.element.find(settings.canvas)).height()+"px"
						});

		/**
			FUNCTIONS
		**/
		function init(target) {
			target.drawImage({
				name: "spinner_dropout",
				source: '/assets/dispenser_spinner_dropper.png',
				x: 123, y: 15,
				layer: true,
				fromCenter: true,
				index: 9
			}).drawImage({
				name: "result_background",
				source: '/assets/dispenser_result_background.png',
				x: 126, y: 122,
				layer: true,
				fromCenter: true,
				index: 1
			}).drawImage({
				name: "result_background_overlay",
				source: '/assets/dispenser_result_overlay.png',
				x: 126, y: 127,
				layer: true,
				fromCenter: true,
				index: 10
			}).drawLayers();
		}

		/**
			CODE
		**/
		init(settings.element.find(settings.canvas));

		return true;
	};
}( jQuery ));