// console.js
function showConsole() {
	$('.console').removeClass('console-hidden');
	$('.console').addClass('console-show');
	$('.code-data').addClass('console-visible');
}

function hideConsole() {
	$('.console').removeClass('console-show');
	$('.console').addClass('console-hidden');
	$('.code-data').removeClass('console-visible');
}