window.onload = function() {
	// modal launch hide
	var launchbutton = document.getElementById('launchbutton');
	launchbutton.style.display = 'none';
	launchbutton.click();
	initColor(document.querySelector('#codeHex'));
}

function initColor(obj) {
	let i = Math.floor(Math.random() * 5);
	let n = aColors[i].toString().substr(1);
	obj.value = n;
	hex2rgb(n);
	return drawshape(aColors[i]);
}

function savePic(canvasId) {
	var img_data = Canvas2Image.convertToImage(canvasId, c.width, c.height, 'png').getAttribute('src');
	var filename = document.querySelector('#filename').value;
	saveFile(img_data, filename + '.png');
};

function saveFile(data, filename) {
	var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	save_link.href = data;
	save_link.download = filename;
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	save_link.dispatchEvent(event);
};

function drawshape(colorValue) {
	var shape = document.getElementsByName('picShape');
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = colorValue;
	for (let j = 0; j < shape.length; j++) {
		if (shape[j].checked) {
			// console.log(shape[j].value);
			switch (shape[j].value) {
				case 'Rounded':
					let r = 80,
						d = 512;
					ctx.beginPath();
					ctx.moveTo(r, 0); // 创建起始点
					ctx.lineTo(d - r, 0); // 创建直线 
					ctx.arcTo(d, 0, d, r, r); // 创建弧
					ctx.lineTo(d, d - r);
					ctx.arcTo(d, d, d - r, d, r);
					ctx.lineTo(r, d);
					ctx.arcTo(0, d, 0, d - r, r);
					ctx.lineTo(0, r);
					ctx.arcTo(0, 0, r, 0, r);
					ctx.fill();
					break;
				case 'Circle':
					ctx.beginPath();
					ctx.arc(c.width / 2, c.height / 2, c.height / 2, 0, 2 * Math.PI);
					ctx.fill();
					break;
				default:
					ctx.fillRect(0, 0, c.width, c.height);
			}
		}
	}

	// hex2rgb(colorValue)

}


function hex2rgb(hex) {
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	var color = hex.toLowerCase();
	let colorChange = [];
	for (let i = 1; i < 7; i += 2) {
		colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
	}
	for (let i = 0; i < 3; i++) {
		document.getElementById("codeRgb" + (i + 1)).value = colorChange[i];
	}
	return rgb2hsl(colorChange[0], colorChange[1], colorChange[2]);
}

function rgb2hsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;
	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	let colorChange = [];
	colorChange.push(Math.round(h * 360), Math.round(s * 100), Math.round(l * 100));
	for (let i = 0; i < 3; i++) {
		document.getElementById("codeHsl" + (i + 1)).value = colorChange[i];
	}
}