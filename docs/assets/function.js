window.onload = function() {
	// modal launch hide
	var launchbutton = document.getElementById('launchbutton-Menu');
	launchbutton.style.display = 'none';
	launchbutton.click();
}

$(document).ready(function() {
	$('#link-to-solid').click(function() {
		setTimeout(function() {
			resizeCanvas();
		}, 300);
	});
});

function resizeCanvas() {
	let side = $('#pngCanvas').width() < $('#pngCanvas').height() ? $('#pngCanvas').width() : $('#pngCanvas').height();
	console.log('side: ', side);
	$('#pngCanvas').width(side);
	$('#pngCanvas').height(side);
}