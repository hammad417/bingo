function getpattern() {
	var pattern = [0,1,2,7,8,13,18,22,23];
	return pattern;
}

function getBallTimeInterval() {
	return 5;
}

function getRandomBalls() {
		var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,76],
    ranNums = [],
    i = nums.length,
    j = 0;
		while (i--) {
		    j = Math.floor(Math.random() * (i+1));
		    ranNums.push(nums[j]);
		    nums.splice(j,1);
		}
		return ranNums;
}

function getRandomBallsColor() {
  return randomnumber=Math.floor(Math.random()*4)
}

function generateRandomCardNumbers() {
	var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,76],
	ranNums = [],
  i = 26,
  j = 0;
	while (i--) {
	    j = Math.floor(Math.random() * (i+1));
	    ranNums.push(nums[j]);
	    nums.splice(j,1);
	}
	return ranNums;
}

var indexOf = function(needle) {
  if(typeof Array.prototype.indexOf === 'function') {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function(needle) {
      var i = -1, index = -1;
      for(i = 0; i < this.length; i++) {
        if(this[i] === needle) {
          index = i;
          break;
        }
      }
      return index;
    };
  }
  return indexOf.call(this, needle);
};

function createCardOnClick() {
	
	$('.small-gamecard.unbought li button').click(function(){
		var randomCards = generateRandomCardNumbers();
		var pattern = getpattern();
		var card = '';
		for(var i = 0; i < 25; i++) {
      if(i == 12) {
        card += '<li class="star"></li>';
      } else {
      	var match = indexOf.call(pattern, i);
      	if(match >= 0) {
      		card += '<li class="pattern">'+randomCards[i]+'</li>';
      	}
      	else {
      		card += '<li class="">'+randomCards[i]+'</li>';
      	}
      }
    }
	  $(this).parent().parent().removeClass('unbought');
		$(this).parent().parent().html(card);
		
	});
}
function dropBall(number) {
  //generate random values
 var balls = ['chute1','chute2','chute3','chute4'];
 $('<div class="chute1" id="'+balls[getRandomBallsColor()]+'"><div class="ball-number"></div></div>').appendTo('#dispenser');
 $('#dispenser .ball-number').text(number);
  var top = 394;
  $('.chute1').animate({
      top: top
  }, 3000);
  var top = 436;
  var left = 82;
  $('.chute1').animate({
      top: top,
      left: left
  }, 1000);
  var left = -20;
  $('.chute1').animate({
      left: left
  }, 1000,function(){
    $(this).remove();
  });

}

function main() {
	createCardOnClick();
	var randomBalls = getRandomBalls();
  console.log(randomBalls);
	var actionTimeout = getBallTimeInterval()*1000;
  var count = 0;
	randomBalls.forEach(function(i, randomBall) {
    setTimeout(function() {
      dropBall(randomBall);
    }, i * actionTimeout);
    setTimeout(function() {
    	$('#gamecard-numbers li').each(function() {
    		if($(this).text() == randomBall) {
    			$(this).addClass('active');
    		}
    	});
    	$('#gamecards-container .small-gamecard:not(.unbought)').each(function(){
    		$(this).children().each(function(){
    			if($(this).text() == randomBall) {
	    			$(this).addClass('checked');
	    		}
    		});
    	});
  	}, i * actionTimeout);
	});
}
main();