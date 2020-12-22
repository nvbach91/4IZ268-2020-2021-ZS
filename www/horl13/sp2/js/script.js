var emailclient = {
	access_token: "",
	token_type: "",
	expires_in: "",
	restoringState: false
};

$(document).ready(function() {

    var requiredSignIn = false;
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        var urlParams = new URLSearchParams(hash);
        if (urlParams.has("access_token") && urlParams.has("token_type") && urlParams.has("expires_in")) {
            emailclient.access_token = urlParams.get("access_token");
            emailclient.token_type = urlParams.get("token_type");
            emailclient.expires_in = urlParams.get("expires_in");

            if (getCookie("access_token") != emailclient.access_token) {
                setCookie("access_token", emailclient.access_token, 365);
                setCookie("token_type", emailclient.token_type, 365);
                setCookie("expires_in", Date.now() + (parseInt(emailclient.expires_in) * 1000), 365);
            }

            if (parseInt(getCookie("expires_in")) < Date.now()) {
                requiredSignIn = true;
            }
        } else {
            requiredSignIn = true;
        }
    } else {
        requiredSignIn = true;
    }
    if (getCookie("expires_in") != "" && parseInt(getCookie("expires_in")) >= Date.now()) {
        emailclient.access_token = getCookie("access_token");
        emailclient.token_type = getCookie("token_type");
        emailclient.expires_in = getCookie("expires_in");
        requiredSignIn = false;
    } else {
        requiredSignIn = true;
    }

    if (requiredSignIn === true) {
        oauthSignIn();
    }

    loadThreadsList();
    restoreState();

    $(window).on("popstate", function() {
        restoreState();
    });

    $("body").on("click", ".thread-info, .thread-open", function() {
        $("body").addClass("loading");
        var thread_id = $(this).parents(".thread").attr("id");
        history.pushState({}, thread_id, "#thread=" + thread_id);
        loadThread(thread_id, openThread);
    });

    $("body").on("click", ".thread-delete", function() {
        var $thread = $(this).parents(".thread");
        var id = $thread.attr("id");
        $("body").addClass("loading");
        $.ajax({
            url: `https://gmail.googleapis.com/gmail/v1/users/me/threads/${id}/trash`,
            type: "post",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", emailclient.token_type + " " + emailclient.access_token);
            },
            data: {
                access_token: emailclient.access_token
            },
            dataType: "json",
            success: function(response) {
                $(".loading").removeClass("loading");
                if (response.error == undefined) {
                    $thread.remove();
                } else {
                    $(".messages").text("Konverzaci se nepodařilo odstranit.");
                }
            },
            error: function() {
                $(".loading").removeClass("loading");
                $(".messages").text("Konverzaci se nepodařilo odstranit.");
            }
        })
    });

    $(".new-message").click(function() {
        history.pushState({}, "Nová zpráva", "#new");
        $(".modal-new-message").modal();
    });

    $(".new-message-form").submit(function(e) {
        e.preventDefault();
        var $form = $(this);
        $form.addClass("loading");
        $.ajax({
            url: "https://gmail.googleapis.com/gmail/v1/users/me/profile",
            type: "GET",
            data: {
                access_token: emailclient.access_token
            },
            success: function(response) {
                if (response.emailAddress != undefined) {
                    var from = response.emailAddress;
                    var date = new Date();
                    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    var message =
                        `Date: ${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.toLocaleTimeString("cs-CZ")} ${date.toString().match(/([-\+][0-9]+)\s/)[1]}
Subject: ${$form.find("[name=subject]").val()}
From: ${from}
To: ${$form.find("[name=to]").val()}
Content-Type: text/plain; charset="UTF-8"

${$form.find("[name=text]").val()}`;
                    var rawMessage = btoa(message);
                    $.ajax({
                        url: $form.attr("action"),
                        type: $form.attr("method"),
                        contentType: "application/json",
                        beforeSend: function(request) {
                            request.setRequestHeader("Authorization", emailclient.token_type + " " + emailclient.access_token);
                        },
                        data: JSON.stringify({
                            raw: rawMessage
                        }),
                        success: function(response) {
                            $(".loading").removeClass("loading");
                            $(".messages").text("Zpráva byla úspěšně odeslána.");
                            $(".modal-new-message").modal("hide");
                            $form[0].reset();
                        },
                        error: function() {
                            $(".loading").removeClass("loading");
                            $(".messages").text("Zprávu se nepodařilo odeslat.");
                        }
                    });
                }
            },
            error: function() {
                $(".loading").removeClass("loading");
                $(".messages").text("Zprávu se nepodařilo odeslat.");
            }
        });
    });

    $("body").on("click", ".thread-important", function() {
        var $thread = $(this).parents(".thread");
        var id = $thread.attr("id");
        var important = getImportant();
        if (important.includes(id)) {
            var index = important.indexOf(id);
            if (index > -1) {
                important.splice(index, 1);
            }
            $thread.removeClass("important");
        } else {
            important.push(id);
            $thread.addClass("important");
        }
        localStorage.setItem("important", JSON.stringify(important));
    });

    $("body").on("hidden.bs.modal", ".opened-thread", function(e) {
        $(e.currentTarget).remove();
        if (emailclient.restoringState === false) {
            history.pushState({}, "Inbox", ".");
        }
    });

    $(".modal-new-message").on("hidden.bs.modal", function(e) {
        if (emailclient.restoringState === false) {
            history.pushState({}, "Inbox", ".");
        }
    });
});

function restoreState() {
    emailclient.restoringState = true;
    $(".modal").modal("hide");
    if (window.location.hash) {
        var hash = window.location.hash.substring(1);
        var urlParams = new URLSearchParams(hash);
        if (urlParams.has("new")) {
            $(".modal-new-message").modal();
        } else if (urlParams.has("thread")) {
            var thread_id = urlParams.get("thread");
            loadThread(thread_id, openThread);
        }
    }
    emailclient.restoringState = false;
}

function getImportant() {
    var important = localStorage.getItem("important");
    if (important != null) {
        important = JSON.parse(important);
    } else {
        important = [];
    }
    return important;
}

function decodeBody(messageOrPart) {
    if (messageOrPart.payload != undefined) {
        messageOrPart = messageOrPart.payload;
    }
    var headers = parsePairs(messageOrPart.headers);

    var $result = $("<div></div>");
    if (messageOrPart.body.data != undefined) {
        body = decodeBase64(messageOrPart.body.data);
    }

    if (messageOrPart.mimeType == "text/html") {
        $iframe = $("<iframe></iframe>");
		$iframe.ready(function() {
			var body2 = body;
			$iframe.contents().find("body").ready(function() {
				$iframe.css({height: $iframe.contents().outerHeight(), width: $iframe.contents().outerWidth()});
			});
			$iframe.contents().find("body").html(body2);
		});
        $result.append($iframe);
    } else if (messageOrPart.mimeType == "text/plain") {
        $result.append(body);
    } else if (messageOrPart.mimeType == "multipart/alternative") {
		$result.append(decodeBody(messageOrPart.parts[0]));
    } else if (messageOrPart.mimeType == "multipart/mixed" || messageOrPart.mimeType == "multipart/signed") {
        messageOrPart.parts.forEach(function(part, j) {
            $result.append(decodeBody(part));
        });
    } else {
        return "";
    }

    return $result;
}

function decodeBase64(str) {
    return decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/"))));
}

function openThread(thread) {
    console.log(thread);
    var modal = $(
        `<div class="modal opened-thread appear">
			<div class="modal-content">
				<div class="row align-items-center">
					<div class="col"><h3>${parsePairs(thread.messages[0].payload.headers).Subject}</h3></div>
					<div class="col-auto"><button class="modal-close" data-dismiss="modal" data-target=".opened-thread">Zavřít</button></div>
				</div>
			</div>
		</div>`
    );
    thread.messages.forEach(function(message, i) {
        var headers = parsePairs(message.payload.headers);
        var date = new Date(headers.Date);
        modal.find(".modal-content").append(
            `<div class="message mb-3" id="message-${message.id}">
				Od: ${headers.From.toHtmlEntities()}<br />
				Datum a čas: ${date.toLocaleDateString() + " " + date.toLocaleTimeString()}<br />
				<div class="mt-3 message-body"></div>
			</div>`
        );

		var content = decodeBody(message);
        modal.find("#message-" + message.id + " .message-body").append(content);
    });
    $(".modals").append(modal);
    $(".opened-thread").modal();
    $(".loading").removeClass("loading");
}

function loadThreadsList() {
    $.ajax({
        url: `https://gmail.googleapis.com/gmail/v1/users/me/threads`,
        type: "get",
        data: {
            access_token: emailclient.access_token,
            maxResults: 20,
            labelIds: "INBOX"
        },
        dataType: "json",
        success: function(response) {
            var threadsList = "";
            var important = getImportant();
            response.threads.forEach(function(e, i) {
                var importantClass = "";
                if (important.includes(e.id)) {
                    importantClass = "important";
                }
                threadsList += `<div class="thread ${importantClass}" id="${e.id}"></div>`;
                loadThread(e.id, function(thread) {
                    addThreadContent(thread)
                });
            });
            $(".loading").removeClass("loading");
            $(".threads-list").append(threadsList);
        },
        error: function() {
            $(".loading").removeClass("loading");
            $(".messages").text("Konverzace se nepodařilo načíst.");
        }
    });
}

function loadThread(id, callback = function() {}) {
    $.ajax({
        url: `https://gmail.googleapis.com/gmail/v1/users/me/threads/${id}`,
        type: "get",
        data: {
            access_token: emailclient.access_token
        },
        dataType: "json",
        success: function(response) {
            callback(response);
        },
        error: function() {
            $(".messages").text("Konverzaci se nepodařilo načíst.");
        }
    });
}

function addThreadContent(thread) {
    var message = thread.messages[thread.messages.length - 1];
    var headers = parsePairs(message.payload.headers);
    var subject = headers.Subject;
    $(".threads-list #" + thread.id).append(`<div class="thread-content"><div class="row align-items-center"><div class="col"><div class="thread-info"><strong class="pr-1">${subject}</strong> - ${message.snippet}</div></div><div class="col-auto actions"><button class="thread-important">Označit jako důležité</button><button class="thread-open">Otevřít</button><button class="thread-delete">Smazat</button></div></div></div>`)
}

function parsePairs(array) {
    var result = {};
    array.forEach(function(e, i) {
        result[array[i]["name"]] = array[i]["value"];
    });
    return result;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

String.prototype.toHtmlEntities = function() {
    return this.replace(/./gm, function(s) {
        return (s.match(/[a-z0-9\s]+/i)) ? s : "&#" + s.charCodeAt(0) + ";";
    });
};

function oauthSignIn() {
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    var form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);

    var params = {
        "client_id": "145341990144-s4sk1krkm10qkko0b2chfv6gurenv12g.apps.googleusercontent.com",
        "redirect_uri": window.location,
        "response_type": "token",
        "scope": "https://mail.google.com/",
    };

    for (var p in params) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
}