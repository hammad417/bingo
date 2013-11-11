var emoticons = {
	':)' 	: 'emoticon-smile',
	':(' 	: 'emoticon-sad',
	':P' 	: 'emoticon-tongue',
	':D' 	: 'emoticon-bigsmile',
	':O' 	: 'emoticon-what',
	';)' 	: 'emoticon-wink',
	'8)' 	: 'emoticon-glasses',
	'8|' 	: 'emoticon-sunglasses',
	'>:(' 	: 'emoticon-frown',
	':/' 	: 'emoticon-meh',
	':\'(' 	: 'emoticon-tears',
	'O:)' 	: 'emoticon-holy',
	':-*' 	: 'emoticon-kiss',
	'<3' 	: 'emoticon-heart',
	'^_^' 	: 'emoticon-veryhappy',
	'-_-' 	: 'emoticon-noteven',
	'O.o' 	: 'emoticon-woot',
	'>:o' 	: 'emoticon-mad',
	':v' 	: 'emoticon-ohrly',
	':3' 	: 'emoticon-purr',
	':[]' 	: 'emoticon-robot',
	'3:)' 	: 'emoticon-evil'
}, 
patterns = [],
metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

String.prototype.convertEmoticons = function() {
	// build a regex pattern for each defined property
	for (var i in emoticons) {
		if (emoticons.hasOwnProperty(i)){ // escape metacharacters
			patterns.push('('+i.replace(metachars, "\\$&")+')');
		}
	}

	// build the regular expression and replace
	return this.replace(new RegExp(patterns.join('|'),'g'), function (match) {
		return typeof emoticons[match] != 'undefined' ?
			'<div class="'+emoticons[match]+'"/>' :
			match;
	});
};

var htmlcode = '<div class="row">',
	i = 0;

$.each(emoticons, function(key, value){
	htmlcode += '<div class="col-1 emoticon" data-emoticon="'+key+'"><div class="'+value+'"></div><span>'+key+'</span></div>';
	i++;
	if(i >= 11) {
		htmlcode += '</div><div class="row">';
		i = 0;
	}
});

htmlcode += '</div>';

$(function(){
	$("#selectEmoticon").popover({
		html: true,
		content: htmlcode,
		placement: 'top',
		trigger: 'click'
	});

	$(document).on('click', function (e) {
		if (
			!$('#selectEmoticon').is(e.target) && 
			$('#selectEmoticon').has(e.target).length === 0
		) {
			$("#selectEmoticon").popover('hide');
		}
	}).on('click', '.emoticon', function(e) {
		if(
			(
				$(e.target).is(".emoticon") ||
				$(e.target).parent().is(".emoticon")
			) || (
				!$(e.target).is("#selectEmoticon") &&
				!$($(e.target).parent()).is("#selectEmoticon")
			)
		) {
			var emoticon = $(e.target).closest(".emoticon").attr("data-emoticon");

			$("#messageField").val($("#messageField").val() + emoticon);
			$("#messageField").focus();

			$("#selectEmoticon").popover('hide');
		}
	});
});