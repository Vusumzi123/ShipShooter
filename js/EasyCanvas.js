//recursos:
//http://smarchal.com/
//http://jscolor.com/
//http://www.cssmatic.com/

//Encabezado para facilitar el uso de Canvas

function CanvasHead(canvas) {

	this.ctx = canvas.getContext("2d");
	this.ctx.fillStyle="white";
	this.ctx.textAlign="center";
	this.eWith=1;
	this.scolorBuffer;
	this.fcolorBuffer;
	this.width=canvas.width;
	this.height=canvas.height;
	this.centerW=canvas.width/2;
	this.centerH=canvas.height/2;
	this.mouseX = 0;
	this.mouseY = 0;
	var canObj = this;


	this.resizeCanvas=function(width, height){
	canvas.width = width;
	canvas.height = height;
	this.width=canvas.width;
	this.height=canvas.height;
	this.centerW=canvas.width/2;
	this.centerH=canvas.height/2;
	}


	this.radius = 50.0;
	this.X; this.Y;
	this.nX, this.nY;
	this.delay = 16;

	// this.initCanvas = function(){
	// 		canObj.canvas.addEventListener('mousemover', function(event){
	// 		var mX = event.clientX - canObj.ctx.canvas.offsetLeft;
	// 		var mY = event.clientY - canObj.ctx.canvas.offsetTop;
	// 		canObj.mouseX = mX;
	// 		canObj.mouseY = mY;
	// 	});
	// };

	// this.initCanvas();
	this.canvasPos = getPosition(canvas);
	canvas.addEventListener("mousemove", setMousePosition, false);
	

	function setMousePosition(e) {
		canObj.mouseX = e.clientX - canObj.canvasPos.x;
		canObj.mouseY = e.clientY - canObj.canvasPos.y;
	}



	this.rgb2hex = function(rgb) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	};


	this.ellipse = function(x , y, w, h){
		this.ctx.beginPath();
		this.ctx.ellipse(x , y, w/2, h/2, 0, 0, 2*Math.PI);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
	};

	this.rect = function(x,y,w,h){
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
	};

	this.line = function(x1,y1,x2,y2) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1,y1);
		this.ctx.lineTo(x2,y2);
		this.ctx.closePath();
		this.ctx.stroke();
	};

	this.point = function(x,y){
		this.ctx.fillStyle=this.scolorBuffer;
		/*this.ctx.ellipse(x, y, this.eWith, this.eWith, 0, 0, 2*Math.PI);
		this.ctx.closePath();
		this.ctx.fill();
		this.restoreColor();*/
	this.rect(x,y,0.5,0.5);
		this.ctx.stroke();
	};


	this.restoreColor = function(){
		this.ctx.fillStyle=this.fcolorBuffer;
		this.ctx.strokeStyle=this.scolorBuffer;
	};

	this.text = function(tex, x , y, s){

	//s = typeof s !== 'undefined' ? s : 42;

		if(arguments.length<4){
			this.ctx.font = "30px Arial";
			this.ctx.fillText(tex,x,y);
			//this.ctx.strokeText(tex,x,y);
			//console.log("funcion text");
		}else{
			var size= s+"px Arial";
			this.ctx.font = size;
			this.ctx.fillText(tex,x,y);
			//this.ctx.strokeText(tex,x,y);
			//console.log("funcion text y size");
		}
	};


	this.stroke = function(re,gr,bl){
		if(arguments.length<3){
			this.ctx.strokeStyle=arguments[0];
			colorBuffer=arguments[0]
		}else{
			var rgba="rgb("+re+","+gr+","+bl+")";
			var col=rgb2hex(rgba);
			this.ctx.strokeStyle=col;
			scolorBuffer=col;
		}


	};

	this.fill = function(re,gr,bl){
		if(arguments.length<3){
			this.ctx.fillStyle=arguments[0];
		}else{
			var rgba="rgb("+re+","+gr+","+bl+")";
			this.ctx.fillStyle=this.rgb2hex(rgba);
		}
	};

	this.strokeWeight = function(weight){
		this.ctx.lineWidth=""+weight;
		eWith=weight;
	};

	this.clearCanvas = function(){
		this.ctx.clearRect(0,0,canvas.width,canvas.height);
	};

	this.background = function(color){
		this.clearCanvas();
		this.ctx.fillStyle=color;
		this.ctx.fillRect(0,0,canvas.width,canvas.height);
		this.restoreColor();
	};

	this.linearGrad= function(start, end, color1, color2){
	var GradientVertical = this.ctx.createLinearGradient(0, start, 0, end);
		GradientVertical.addColorStop(0, color1);
		GradientVertical.addColorStop(1, color2);
	return GradientVertical;
	};

	this.save = function(){
	this.ctx.save();
	};

	this.restore = function(){
	this.ctx.restore();
	};

	this.drawImage = function(img,x,y,dWidth=0, dHeight=0){
		var elm = document.createElement("img");
		elm.src = img;
		if(dWidth===0 || dHeight===0){
			this.ctx.drawImage(elm ,x,y);
		}else{
		this.ctx.drawImage(elm,x,y,dWidth, dHeight);
		}
	}

	this.draw = function(){
	}

	this.animate = function(){
		canObj.draw();
		requestAnimationFrame(canObj.animate);
	};

	this.animate();

	this.mouseReleased = function(){ }

	this.mouseClicked = function(){ }

	canvas.addEventListener("mouseup", function(e){ canObj.mouseReleased()});
	canvas.addEventListener("mousedown", function(e){ canObj.mouseClicked()});


	// this.requestAnimationFrame =
	//         window.requestAnimationFrame ||
	//         window.webkitRequestAnimationFrame ||
	//         window.mozRequestAnimationFrame ||
	//         window.msRequestAnimationFrame ||
	//         window.oRequestAnimationFrame ||
	//         function(callback) {
	//           return setTimeout(callback, 1);
	//     	};

	//Fin del encabezado


	// deal with the page getting resized or scrolled
	window.addEventListener("scroll", updatePosition, false);
	window.addEventListener("resize", updatePosition, false);

	function updatePosition() {
		canObj.canvasPos = getPosition(canvas);
	}

	// Helper function to get an element's exact position
	function getPosition(el) {
		var xPos = 0;
		var yPos = 0;

		while (el) {
			if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
			} else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
			}

			el = el.offsetParent;
		}
		return {
			x: xPos,
			y: yPos
		};
	}

};
