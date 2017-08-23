var username, image;
chrome.identity.getProfileUserInfo(function(data) {
	console.log(data);
	$.get('http://picasaweb.google.com/data/entry/api/user/' + data.email + '?alt=json', function(userData) {
		username = userData.entry.gphoto$nickname.$t;
		image = userData.entry.gphoto$thumbnail.$t;
	});
});

var socket = io('http://10.7.20.3:2000');

socket.on('connect', function(){
	console.log('socket connected');
});

socket.on('new_message', function(message){
	var opt = {
		type: "basic",
		title: 'SOS from '+  message.username,
		message: message.message,
		iconUrl: message.image,
	}
	chrome.notifications.create('', opt, replyBtnClick);
	function replyBtnClick(id) {};
});

socket.on('disconnect', function(){
	console.log('socket disconnect');
});

chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg) {
   var message = {};
   message.message = msg.message;
   message.username = username;
   message.image = image;
   socket.emit('sos_message', message);
}