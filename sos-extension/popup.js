function sendMessage() {
	$('.input-wrapper').addClass('sent');
	setTimeout(function() {
		$('.input-wrapper').removeClass('sent');
		$('input').val('');
	}, 1500);
	var message = $('#message').val();
	chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
		chrome.runtime.sendMessage({message: message}, function(response) {
			console.log(response);
		});
	});
}

$(document).ready(function(){
	$("#avatar").attr("src", chrome.extension.getBackgroundPage().image);
	$('#button').click(function(){
		sendMessage();
	});
	$('#message').keypress(function(e) {
		if(e.which == 13) {
			sendMessage();
		}
	});
});

