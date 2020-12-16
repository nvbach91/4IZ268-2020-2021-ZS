var access_token;
var token_type;
var expires_in;

$(document).ready(function() {
	if (window.location.hash) {
		var hash = window.location.hash.substring(1);
		const urlParams = new URLSearchParams(hash);
		if (urlParams.has("access_token") && urlParams.has("token_type") && urlParams.has("expires_in")) {
			access_token = urlParams.get("access_token");
			token_type = urlParams.get("token_type");
			expires_in = urlParams.get("expires_in");
			
			if (getCookie("access_token") != access_token) {
				setCookie("access_token", access_token, 365);
				setCookie("token_type", token_type, 365);
				setCookie("expires_in", Date.now() + (parseInt(expires_in) * 1000), 365);
			}
			
			if (parseInt(getCookie("expires_in")) < Date.now()) {
				oauthSignIn();
			}
		} else {
			oauthSignIn();
		}
	} else {
		oauthSignIn();
	}
	
	loadThreadsList();
	
	$("body").on("click", ".thread-info, .thread-open", function() {
		$("body").addClass("loading");
		let thread_id = $(this).parents(".thread").attr("id");
		loadThread(thread_id, function(thread) {
			console.log(thread);
			let modal = $("<div class='modal opened-thread appear'><div class='modal-content'></div></div>");
			thread.messages.forEach(function(message, i) {
				const headers = parsePairs(message.payload.headers);
				modal.find(".modal-content").append(
				`<div class='message' id='${message.id}'>
					<div class='row'>
						<div class='col'><strong>${headers.Subject}</strong></div>
						<div class='col-auto'><button class='modal-close' data-dismiss='modal' data-target=".opened-thread">Zavřít</button></div>
					</div>
					Od: ${headers.From}
				</div>`);
			});
			$(".modals").append(modal);
			$(".opened-thread").modal();
			$(".loading").removeClass("loading");
		});
	});
	
	$("body").on('hidden.bs.modal', '.opened-thread', function (e) {
		$(e.currentTarget).remove();
	});
});

function loadThreadsList() {
	$.ajax({
		url: `https://gmail.googleapis.com/gmail/v1/users/me/threads`,
		type: "get",
		data: {access_token: access_token, maxResults: 20},
		dataType: "json",
		success: function(response) {
			response.threads.forEach(function(e, i) {
				loadThread(e.id, function(thread) {
					addThreadToList(thread)
				});
				$(".loading").removeClass("loading");
			});
		},
		fail: function() {
			
		}
	});
}

function loadThread(id, callback = function(){}) {
	$.ajax({
		url: `https://gmail.googleapis.com/gmail/v1/users/me/threads/${id}`,
		type: "get",
		data: {access_token: access_token},
		dataType: "json",
		success: function(response) {
			callback(response);
		},
		fail: function() {
			
		}
	});
}

// function loadMessagesList() {
	// $.ajax({
		// url: `https://gmail.googleapis.com/gmail/v1/users/me/messages`,
		// type: "get",
		// data: {access_token: access_token, maxResults: 20},
		// dataType: "json",
		// success: function(response) {
			// response.messages.forEach(function(e, i) {
				// loadMessage(e.id);
			// });
		// },
		// fail: function() {
			
		// }
	// });
// }

// function loadMessage(id) {
	// $.ajax({
		// url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
		// type: "get",
		// data: {access_token: access_token},
		// dataType: "json",
		// success: function(response) {
			
		// },
		// fail: function() {
			
		// }
	// });
// }

function addThreadToList(thread) {
	const message = thread.messages[thread.messages.length-1];
	const headers = parsePairs(message.payload.headers);
	const subject = headers.Subject;
	$(".threads-list").append(`<div class='thread' id='${thread.id}'><div class='thread-content'><div class='row align-items-center'><div class='col'><div class="thread-info"><strong class='pr-1'>${subject}</strong> - ${message.snippet}</div></div><div class='col-auto actions'><button class='thread-important'>Označit jako důležité</button><button class='thread-open'>Otevřít</button><button class='thread-delete'>Smazat</button></div></div></div></div>`)
}

function parsePairs(array) {
	let result = {};
	array.forEach(function(e, i) {
		result[array[i]["name"]] = array[i]["value"];
	});
	return result;
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
	// Google's OAuth 2.0 endpoint for requesting an access token
	var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

	// Create <form> element to submit parameters to OAuth 2.0 endpoint.
	var form = document.createElement('form');
	form.setAttribute('method', 'GET'); // Send as a GET request.
	form.setAttribute('action', oauth2Endpoint);

	// Parameters to pass to OAuth 2.0 endpoint.
	var params = {
		'client_id': '145341990144-s4sk1krkm10qkko0b2chfv6gurenv12g.apps.googleusercontent.com',
		'redirect_uri': 'https://emailclient.abcmedia.cz',
		'response_type': 'token',
		'scope': 'https://mail.google.com/',
	};

	// Add form parameters as hidden input values.
	for (var p in params) {
		var input = document.createElement('input');
		input.setAttribute('type', 'hidden');
		input.setAttribute('name', p);
		input.setAttribute('value', params[p]);
		form.appendChild(input);
	}

	// Add form to page and submit it to open the OAuth 2.0 endpoint.
	document.body.appendChild(form);
	form.submit();
}