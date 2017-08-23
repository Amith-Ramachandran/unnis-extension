$(document).ready(function(){
	$('#button').click(function(){
		var message = $('#message').val();
		chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
			console.log(tabs[0]);
			chrome.runtime.sendMessage({message: message}, function(response) {
				console.log(response);
			});
		});
	});
});
