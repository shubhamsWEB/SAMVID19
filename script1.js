		(function(){"use strict";var e=10;var f={init:function(){setTimeout((function(){this.canvas=document.getElementById('stage');this.context=this.canvas.getContext('2d');this.initOptions();this.resize();this.tick()}).bind(this),100)},initOptions:function(){this.width=document.documentElement.offsetWidth;this.height=300;this.textSize=Math.floor(this.width/7);if(this.textSize>this.height){this.textSize=Math.floor(this.height/0.5)}this.font='400 '+this.textSize+'px "Bangers"';this.context.font=this.font;this.text="#machaateyraho";this.textWidth=(this.context.measureText(this.text)).width;this.fps=60;this.channel=0;this.compOp='lighter';this.phase=0.0;this.phaseStep=0.05;this.amplitude=0.0;this.amplitudeBase=2.0;this.amplitudeRange=2.0;this.alphaMin=0.8;this.glitchAmplitude=20.0;this.glitchThreshold=0.9;this.scanlineBase=40;this.scanlineRange=40;this.scanlineShift=15},tick:function(){setTimeout((function(){this.phase+=this.phaseStep;if(this.phase>1){this.phase=0.0;this.channel=(this.channel===2)?0:this.channel+1;this.amplitude=this.amplitudeBase+(this.amplitudeRange*Math.random())}this.render();this.tick()}).bind(this),1000/this.fps)},render:function(){var a=this.amplitude*Math.sin((Math.PI*2)*this.phase)>>0,x1,x2,x3;if(Math.random()>=this.glitchThreshold){a*=this.glitchAmplitude}x1=this.width-this.textWidth>>1;x2=x1+a;x3=x1-a;this.context.clearRect(0,0,this.width,this.height);this.context.globalAlpha=this.alphaMin+((1-this.alphaMin)*Math.random());switch(this.channel){case 0:this.renderChannels(x1,x2,x3);break;case 1:this.renderChannels(x2,x3,x1);break;case 2:this.renderChannels(x3,x1,x2);break}this.renderScanline();if(Math.floor(Math.random()*2)>1){this.renderScanline()}},renderChannels:function(a,b,c){this.context.font=this.font;this.context.fillStyle="rgb(255,0,0)";this.context.fillText(this.text,a,this.height/2);this.context.globalCompositeOperation=this.compOp;this.context.fillStyle="rgb(0,255,0)";this.context.fillText(this.text,b,this.height/2);this.context.fillStyle="rgb(0,0,255)";this.context.fillText(this.text,c,this.height/2)},renderScanline:function(){var y=this.height*Math.random()>>0,o=this.context.getImageData(0,y,this.width,1),d=o.data,i=d.length,s=this.scanlineBase+this.scanlineRange*Math.random()>>0,x=-this.scanlineShift+this.scanlineShift*2*Math.random()>>0;while(i -- > 0){d[i]+=s}this.context.putImageData(o,x,y)},resize:function(){this.width=document.documentElement.offsetWidth;this.height=300;if(this.canvas){this.canvas.height=this.height;this.canvas.width=this.width;this.textSize=Math.floor(this.canvas.width/7);if(this.textSize>this.height){this.textSize=Math.floor(this.canvas.height/0.5)}this.font='400 '+this.textSize+'px "Bangers"';this.context.font=this.font}}};document.onload=f.init();window.onresize=f.resize()})();
		


		
var target_date = new Date().getTime() + (15000*3600*48); // set the countdown date
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

