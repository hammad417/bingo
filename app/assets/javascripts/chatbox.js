/**
	Versie 1.1
**/

Date.prototype.toAMPM = function() {
	var append = 'AM';

    function pad(n) { return n < 10 ? '0' + n : n }

    hours = this.getUTCHours();
    if(hours >= 12) {
    	hours -= 12;
    	append = 'PM';
    }

    return pad(hours) + ':' + pad(this.getUTCMinutes()) + append;
};

(function ( $ ) {
	$.fn.initializeChatbox = function(options) {
		var settings = $.extend({
			chatboxes: {}
		}, options);

		var result = {
		};

		$.each(settings.chatboxes, function(key, value){
			result = $(this).createChatbox({
				chatboxTitle: 	value.title,
				chatboxID: 		value.id,
				original: 		result 
			});
		});

		$(this).find(".nav.nav-tabs li:first a").tab('show');

		return result;
	};
	
	$.fn.createChatbox = function(options) {
		var settings = $.extend({
			chatTitle: "",
			chatboxID: "",
			original: null
		}, options);

		this.find(".nav.nav-tabs").append($('<li data-chatbox="'+settings.chatboxID+'">\
												<a data-target="#'+settings.chatboxID+'">\
													<span>'+settings.chatboxTitle+'</span>\
													<span class="close"></span>\
												</a>\
											</li>').hide().fadeIn(200));

		this.find(".tab-content").append('<div class="tab-pane" data-chatbox="'+settings.chatboxID+'" id="'+settings.chatboxID+'">');

		var pane = this.find(".tab-pane[data-chatbox="+settings.chatboxID+"]");
		pane.jScrollPane({
			showArrows: false,
			mouseWheelSpeed: 50
		});
		var api = pane.data('jsp');
		settings.original[settings.chatboxID] = api;

		return settings.original;
	};

	$.fn.closeChatbox = function(options) {
		var settings = $.extend({
			chatboxID: "",
			original: {}
		}, options);

		if(settings.original[settings.chatboxID] != null && settings.original[settings.chatboxID] != undefined) {
			settings.original[settings.chatboxID] = null;
		}

		this.find("li[data-chatbox='"+settings.chatboxID+"']").fadeOut(200, function() { $(this).remove(); });
		this.find("div.tab-pane[data-chatbox='"+settings.chatboxID+"']").remove();

		this.find(".nav.nav-tabs li:first a").click();
	}

	$.fn.addChatboxMessage = function( options ) {
 
		var d = new Date();

		// This is the easiest way to have default options.
		var settings = $.extend({
			// These are the defaults.
			playerName: "",
			chatbox: "",
			message: "",
			timestamp: d.toAMPM()
		}, options );
 
		if(settings.playerName == "" || settings.chatbox == "" || settings.message == "" || settings.timestamp == 0) return false;
		
		var target = settings.chatbox.getContentPane();

		settings.chatbox.getContentPane().prepend(
			$('<div class="row message">\
				<div class="name pull-left">'+settings.playerName+'</div>\
				<div class="text pull-left">'+settings.message.convertEmoticons()+'</div>\
				<div class="time pull-right">'+settings.timestamp+'</div>\
			</div>').hide().fadeIn()
		);

		settings.chatbox.reinitialise();

		return true;
	};
}( jQuery ));