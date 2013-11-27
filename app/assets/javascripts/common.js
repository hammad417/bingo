function getBallTimeInterval() {
	return 5;
}
function getRandomBalls() {
		var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
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
function pause( iMilliseconds )
{
    var sDialogScript = 'window.setTimeout( function () { window.close(); }, ' + iMilliseconds + ');';
}
function main() {
	var randomBalls = getRandomBalls();
	console.log(randomBalls);
	for (var i = 0; i < 75; i++) {
		pause( getBallTimeInterval()*1000 );
		console.log(randomBalls.pop());
	}
}
main();