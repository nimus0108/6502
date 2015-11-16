var bigDiv = document.getElementsByClassName("user active");
console.log(bigDiv);

function makeActive(name) {
	$('li').removeClass('active');
	var e = document.getElementById(name);
	e.parentNode.className += " active";
}
