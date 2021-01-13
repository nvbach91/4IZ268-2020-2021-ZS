$(document).ready(() => {
    const headingInput = $('.article-heading');
    const enclosureInput = $('.article-enclosure');
    const submitButton = $('#post-button');
    const checkbox = $('#facebook');
    const main = $('main');
    const headingLabel = $('.heading-label');
    const contentLabel = $('.content-label');
    const enclosureLabel = $('.enclosure-label');
    const preview = $('.preview');
    const removePreview = $(`<img class="delete-button" title="remove images" width="30" src="./assets/images/delete.png" alt="delete-preview-button">`);
    let enclosureFiles;
    let headingAlert = $(`<p> </p>`);
    let contentAlert = $(`<p> </p>`);
    let enclosureAlert = $(`<p> </p>`);
    let loader = $(`
<div class="loader">
    <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <p>Posting...</p>
</div>
`);

    $('.file-upload-button').click(function(e) {
        e.preventDefault();
        $('.preview-images').remove();
        $(enclosureInput).trigger('click');
    })

    CKEDITOR.replace('textarea-content', {
        toolbarGroups: [{
                "name": "basicstyles",
                "groups": ["basicstyles"]
            },
            {
                "name": "links",
                "groups": ["links"]
            },
            {
                "name": "paragraph",
                "groups": ["list", "blocks"]
            },
            {
                "name": "insert",
                "groups": ["insert"]
            },
            {
                "name": "styles",
                "groups": ["styles"]
            },
        ],
        removeButtons: 'Underline,Strike,Subscript,Superscript,Anchor,Styles,Specialchar'
    });

    window.fbAsyncInit = function() {
        FB.init({
            appId: '861235801379691',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v9.0'
        });
    };

    //multiple image preview
    enclosureInput.on('change', function() {
        enclosureFiles = enclosureInput.prop('files');
        console.log(enclosureFiles);
        if (enclosureFiles.length > 0) {
            preview.after(removePreview);
            const filesCounter = enclosureFiles.length;
            for (i = 0; i < filesCounter; i++) {
                let imagePrev = '';
                const reader = new FileReader();
                reader.onload = function(event) {
                    //$($.parseHTML('<img>')).attr({ src: event.target.result, class: 'preview-images' }).appendTo(preview);
                    imagePrev += `<img class="preview-images" src="${event.target.result}" alt="preview-image">`;
                    preview.html(imagePrev);
                };
                reader.readAsDataURL(enclosureFiles[i]);
            };
        } else {
            $('.preview-images').remove();
        };
    });

    removePreview.on('click', function(e) {
        e.preventDefault();
        $('.preview-images').remove();
        removePreview.remove();
        enclosureFiles = "";
        console.log(enclosureFiles);
    });

    // Firebase configuration
    let firebaseConfig = {
        apiKey: "AIzaSyBcqbqn0r2nPlNJIpF38MpOwDFyJ2_6v1E",
        authDomain: "vetj00-sp2.firebaseapp.com",
        databaseURL: "https://vetj00-sp2-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "vetj00-sp2",
        storageBucket: "vetj00-sp2.appspot.com",
        messagingSenderId: "985849452124",
        appId: "1:985849452124:web:9a0b1a6dbce5909c1bf899",
        measurementId: "G-PK8JX7XM3P"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    function postToFeed(downUrl) {
        FB.api('/100387761998951/photos?', 'post', {
                message: $(CKEDITOR.instances['textarea-content'].getData()).text(),
                url: downUrl,
                access_token: 'EAAMPShYCU2sBANS9neQJ9eFKroSeWj5b12CwnJyU8J5zJaEDFQ0owBhOAlAs0N6LC4IRs1x9i6unEaIGPa0LorRbJ1ZCcZBr8mMtbw1f0iaMH0OL3Skyw4YRZB9tD8QWz6eYC2Fr7sCZAVp62C56lGrHOqE7lgyhZCwFAg6XjSVzVqeRtwck8',
                from: '100387761998951',
            },
            function(response) {
                loader.remove();
                loader = $(`<div class="loading">Posted on <a href="https://www.facebook.com/SP2-4iz268-100387761998951/photos/a.100791501958577/${response.id}" target="_blank">this link</a><br>Let's also take a look at your article at <a href="https://eso.vse.cz/~vetj00/sp2/articles/">articles feed</a></div>`);
                main.append(loader);
            });
    };

    const array = [];

    function uploadFile() {
        if (validateForm()) {
            loader.remove();
            loader = $(`<div class="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div><p>Posting...</p></div>`);
            main.append(loader);
            console.log(enclosureFiles);
            for (i = 0; i < enclosureFiles.length; i++) {
                const enclosureFileName = enclosureFiles[i].name;
                const storageRef = firebase.storage().ref('/uploadedFiles/' + enclosureFileName);
                const uploadTask = storageRef.put(enclosureFiles[i]);

                uploadTask.on('state_changed', function(snapshot) {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                }, function(error) {}, function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                        array.push(downloadURL);
                    });
                });
            };
        };
    };

    function databasePush() {
        if (validateForm()) {
            setTimeout(function() {
                if (enclosureFiles.length === 1) {
                    firebase.database().ref('Article').push({
                        heading: headingInput.val(),
                        content: CKEDITOR.instances['textarea-content'].getData(),
                        enclosure: array[0]
                    });
                } else if (enclosureFiles.length === 2) {
                    firebase.database().ref('Article').push({
                        heading: headingInput.val(),
                        content: CKEDITOR.instances['textarea-content'].getData(),
                        enclosure: array[0],
                        secEnclosure: array[1]
                    });
                } else {
                    firebase.database().ref('Article').push({
                        heading: headingInput.val(),
                        content: CKEDITOR.instances['textarea-content'].getData(),
                        enclosure: array[0],
                        secEnclosure: array[1],
                        thirdEnclosure: array[2]
                    });
                }
                if (!checkbox.is(':checked')) {
                    loader.remove();
                    loader = $(`<div class="loading">Let's take a look at your article at <a href="https://eso.vse.cz/~vetj00/sp2/articles/">articles feed</a></div>`);
                    main.append(loader);
                } else {
                    setTimeout(function() {
                        postToFeed(array[0]);
                    }, 2000);
                };
            }, 1000);
        };
    };


    submitButton.on('click', (e) => {
        e.preventDefault();
        uploadFile();
        $.when(uploadFile).then(databasePush);
    });

    function validateHeading() {
        const headingValue = headingInput.val();
        //const regExp = (/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,5}$/);

        //if (!regExp.test(headingValue)) {
        if (!headingValue) {
            headingAlert.removeClass('hide-alert');
            headingAlert.addClass('heading-alert');
            headingAlert.text('Please, fill the heading in');
            headingLabel.after(headingAlert);
            contentAlert.addClass('hide-alert');
            enclosureAlert.addClass('hide-alert');
            return false;
        };

        headingAlert.removeClass('heading-alert');
        headingAlert.addClass('hide-alert');
        return true;
    };

    function validateContent() {
        const contentValue = CKEDITOR.instances['textarea-content'].getData();
        //const regExp = (/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,1000}$/);

        //if (!regExp.test(contentValue)) {
        if (!contentValue) {
            contentAlert.removeClass('hide-alert');
            contentAlert.addClass('content-alert');
            contentAlert.text('Please, fill the content in');
            contentLabel.after(contentAlert);
            enclosureAlert.addClass('hide-alert');
            return false;
        };

        contentAlert.removeClass('content-alert');
        contentAlert.addClass('hide-alert');
        return true;
    };

    function validateEnclosure() {

        if (!enclosureFiles || enclosureFiles.length === 0) {
            enclosureAlert.removeClass('hide-alert');
            enclosureAlert.addClass('content-alert');
            enclosureAlert.text('Please, upload an enclosure');
            enclosureLabel.after(enclosureAlert);
            return false;
        } else if (enclosureFiles.length > 3) {
            enclosureAlert.removeClass('hide-alert');
            enclosureAlert.addClass('content-alert');
            enclosureAlert.text('Please, upload maximum of 3 files');
            enclosureLabel.after(enclosureAlert);
            return false;
        }

        enclosureAlert.removeClass('enclosure-alert');
        enclosureAlert.addClass('hide-alert');
        return true;
    };

    function validateForm() {
        if (!validateHeading() || !validateContent() || !validateEnclosure()) {
            return false;
        } else {
            submitted = true;
            return true;
        };
    };
});