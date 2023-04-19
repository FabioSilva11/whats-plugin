(function () {

	function send_ChatText(text) {
		const dataTransfer = new DataTransfer();
		dataTransfer.setData("text/plain", text);
		const event = new ClipboardEvent("paste", {
			clipboardData: dataTransfer,
			bubbles: true,
		});
		const el = document.querySelector('#main .copyable-area [contenteditable="true"][role="textbox"]');
		el.focus();
		el.dispatchEvent(event);
		setTimeout(() => {
			const sendButton = document.querySelector("span[data-icon='send']");
			if (sendButton) {
				sendButton.click();
			} else {
				console.error("Botão de envio não encontrado.");
			}
		}, 200);
	}


	var Assistant = $('<div id="web-assistant" class="panel panel-primary">' +
		'<div class="panel-heading minimize-icon"><span class="panel-title">Web Assistant' +
		'</span></div><div class="panel-body"><div class="input-group">' +
		'<textarea class="form-control custom-control" rows="3" placeholder="Enter Message"></textarea>' +
		'</div><select class="form-control elm" id="no-of-times"><option>10' +
		'</option><option>20</option><option>50</option><option>100</option><option>' +
		'200</option><option>500</option></select>' +
		'<a id="send" class="bttn btn-outline-primary elm">Send</a>' +
		'<a id="stop" class="bttn btn-outline-warning elm">Stop</a></div></div>');

	$('body').append(Assistant);

	var numero_de_disparo = $("#no-of-times", Assistant);
	var messagems = $("textarea.form-control", Assistant);

	var continueSending = true;
	var sendInterval;

	function sendMessages() {
		var count = numero_de_disparo.val();
		var txt =  messagems.val();
		if (continueSending) {
			send_ChatText(txt);
			count--;
			if (count > 0) {
				sendInterval = setTimeout(sendMessages, 3000);
			}
		}
	}

	$("#send", Assistant).click(function (e) {
		continueSending = true;
		console.error("send");
		sendMessages();
	});

	$("#stop", Assistant).click(function (e) {
		continueSending = false;
		console.error("stop");
		clearTimeout(sendInterval);
		console.log("Stopped sending messages.");
	});

})();
