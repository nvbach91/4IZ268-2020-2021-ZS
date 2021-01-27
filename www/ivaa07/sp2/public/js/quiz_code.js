window.onload = function () {
    let result = {};
    let step = 0;
    function showQuestion(questionNumber) {
        document.querySelector('.question').innerHTML = quiz[step]['q'];
        let answer = '';
        for (let key in quiz[step]['a']) {
            answer += `<li data-v='${key}' class="answer-letiant">${quiz[step]['a'][key]}</li>`;
        }
        document.querySelector('.answer').innerHTML = answer;

    }

    document.onclick = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-letiant') && step < quiz.length) {
            // event.target.data
            if (result[event.target.dataset.v] != undefined) {
                result[event.target.dataset.v]++;
            }
            else {
                result[event.target.dataset.v] = 0;
            }
            step++;
            if (step == quiz.length) {
                document.querySelector('.question').remove();
                document.querySelector('.answer').remove();
                showResult();
            }
            else {
                showQuestion();
            }
        }
        if (event.target.classList.contains('reload-button')) {
            location.reload();
        }
    }

    function showResult() {
        let key = Object.keys(result).reduce(function (a, b) { return result[a] > result[b] ? a : b });

        let div = document.createElement('div');
        div.classList.add('result');
        div.id = "result_text";
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);

        let img = document.createElement('img');
        img.src = 'images/' + answers[key]['image'];
        img.classList.add('result-img')
        document.querySelector('main').appendChild(img);

        let reloadButton = document.createElement('button');
        reloadButton.innerHTML = 'Znovu';
        reloadButton.classList.add('reload-button');
        document.querySelector('main').appendChild(reloadButton);

        let authorizeButton = document.createElement('button');
        authorizeButton.innerHTML = 'Přihlasit se do GD';
        authorizeButton.classList.add('save-button');
        authorizeButton.id = 'authorize_button';
        document.querySelector('main').appendChild(authorizeButton);

        let saveButton = document.createElement('button');
        saveButton.innerHTML = 'Uložit do GD';
        saveButton.classList.add('save-button');
        saveButton.id = 'create_file_button';
        document.querySelector('main').appendChild(saveButton);

        let logOutButton = document.createElement('button');
        logOutButton.innerHTML = 'Odlasit se z GD';
        logOutButton.classList.add('save-button');
        logOutButton.id = 'logout_button';
        document.querySelector('main').appendChild(logOutButton);

        setTimeout(handleClientLoad, 0);
    }

    showQuestion();
}


