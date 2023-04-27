$(document).ready(function() {

	var audioFab = new Audio();
	var current_stream = '';

	$('a.audio').click(function(event){
	    audioFab.src = "sounds/" + event.target.id + ".mp3";
	    audioFab.play();
	    current_stream = event.target.i;
		$('a.audio').removeClass('active');
		$(this).addClass('active');
	});
});