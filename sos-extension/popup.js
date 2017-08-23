$(document).ready(function(){
	$('#button').click(function(){
		$('.input-wrapper').addClass('sent');
		setTimeout(function(){
			$('.input-wrapper').removeClass('sent');
			$('input').val('');
		}, 1500);
		var message = $('#message').val();
		chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
			console.log(tabs[0]);
			chrome.runtime.sendMessage({message: message}, function(response) {
				console.log(response);
			});
		});
	});
});
