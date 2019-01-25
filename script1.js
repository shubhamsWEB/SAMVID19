var target_date = new Date("March 1, 2019 0:0:0"); // set the countdown date
var days, hours, minutes, seconds; // variables for time units

var countdown = document.getElementById("tiles"); // get tag element

getCountdown();

setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){

	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;

	days = pad( parseInt(seconds_left / 86400) );
	seconds_left = seconds_left % 86400;
		 
	hours = pad( parseInt(seconds_left / 3600) );
	seconds_left = seconds_left % 3600;
		  
	minutes = pad( parseInt(seconds_left / 60) );
	seconds = pad( parseInt( seconds_left % 60 ) );

	// format countdown string + set tag value
	countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>"; 
}

function pad(n) {
	return (n < 10 ? '0' : '') + n;
}


// GLITCH EFFECT

$( function() {
		$( ".glitch-img" ).mgGlitch({
          // set 'true' to stop the plugin
				  destroy : false, 
          // set 'false' to stop glitching
          glitch: true, 
          // set 'false' to stop scaling
          scale: true, 
          // set 'false' to stop glitch blending
          blend : true, 
          // select blend mode type
          blendModeType : 'color-dodge',
          // set min time for glitch 1 elem
          glitch1TimeMin : 200, 
          // set max time for glitch 1 elem
          glitch1TimeMax : 400,
          // set min time for glitch 2 elem
          glitch2TimeMin : 10, 
          // set max time for glitch 2 elem
          glitch2TimeMax : 100, 
		});
});

