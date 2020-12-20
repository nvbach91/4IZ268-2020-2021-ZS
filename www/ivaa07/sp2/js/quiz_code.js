window.onload = function () {
    let result = {};
    let step = 0;
    function showQuestion(questionNumber) {
        document.querySelector('.question').innerHTML = quiz[step]['q'];
        let answer = '';
        for (let key in quiz[step]['a']) {
            answer += `<li data-v='${key}' class="answer-variant">${quiz[step]['a'][key]}</li>`;
        }
        document.querySelector('.answer').innerHTML = answer;

    }

    document.onclick = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-variant') && step < quiz.length) {
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

        let shareButton = document.createElement('button');
        shareButton.innerHTML = 'Sdílet IG';
        shareButton.classList.add('share-button');
        document.querySelector('main').appendChild(shareButton);

        let saveButton = document.createElement('button');
        saveButton.innerHTML = 'Uložit do GD';
        saveButton.classList.add('save-button');
        document.querySelector('main').appendChild(saveButton);
    }

    showQuestion();
}


