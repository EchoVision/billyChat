	var socket = io();

	function scrollToBottom () {
		var messages = $('#messages');
		var newMessage = messages.children('li:last-child');
		var clientHeight = messages.prop('clientHeight');
		var scrollTop = messages.prop('scrollTop');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessageHeight = newMessage.prev().innerHeight();

		if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
			messages.scrollTop(scrollHeight);
		}
	}

	socket.on('connect', function () {
		var params = $.deparam(window.location.search);
		socket.emit('join', params, function (error) {
			if (error) {
				alert(error);
				window.location.href = '/';
			} else {
				console.log('No error');
			}
		});
	});

	socket.on('disconnect', function () {
		console.log('Disconnected from server');
	});

	socket.on('updateUserList', function(users) {
		var ol = $('<ol></ol>');
		users.forEach(function (user) {
			ol.append($('<li></li>').text(user));
		});
		$('#users').html(ol);
	});

	socket.on('newMessage', function (newMessage) {
		var formattedTime = moment(newMessage.createdAt).format('h:mm a');
		var template = $('#message-template').html();
		var html = Mustache.render(template, {
			text: newMessage.text,
			from: newMessage.from,
			createdAt: formattedTime
		});
		$('#messages').append(html);
		scrollToBottom();
	});

	$('#message-form').on('submit', function (evt) {
		evt.preventDefault();
		var messageTextBox = $('[name=message]');
		socket.emit('createMessage', {
			text: messageTextBox.val()
		}, function () {
			messageTextBox.val('');
		});
	});
