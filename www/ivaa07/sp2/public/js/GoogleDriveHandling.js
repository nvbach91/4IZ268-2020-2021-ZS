let CLIENT_ID = '531583878789-0tqe058tsfbsud6tnggkb8l18euajokf.apps.googleusercontent.com';
let API_KEY = 'AIzaSyBC32OMrxpDCjAqWW3ryEC7UrlHRx1eYj8';

// Array of API discovery doc URLs for APIs used by the quickstart
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
let SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly ' +
'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive';

let authorizeButton, signoutButton, createFileBtn;


/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {

  gapi.load('client:auth2', initClient);
   authorizeButton = document.getElementById('authorize_button');
   signoutButton = document.getElementById('logout_button');

   createFileBtn = document.getElementById('create_file_button');
}

function saveFileHandler() {
  let text = document.getElementById('result_text').innerText;

  let file = new Blob([text], {type: 'text/plain'});
  let metadata = {
      'name': 'color', // Filename at Google Drive
      'mimeType': 'text/plain', // mimeType at Google Drive
  };

  let accessToken = gapi.auth.getToken().access_token; // Here gapi is used for retrieving the access token.
  let form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
  form.append('file', file);

  let xhr = new XMLHttpRequest();
  xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id');
  xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  xhr.responseType = 'json';
  xhr.onload = () => {
      console.log(xhr.response.id); // Retrieve uploaded file ID.
      alert('Hotovo');
  };
  xhr.send(form);
}


/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;

    createFileBtn.onclick = saveFileHandler;

  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    createFileBtn.style.display = 'block';
    signoutButton.style.display = 'block';
  } else {
    authorizeButton.style.display = 'block';
    createFileBtn.style.display = 'none';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
