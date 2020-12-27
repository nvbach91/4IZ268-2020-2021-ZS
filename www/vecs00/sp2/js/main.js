searchButton.addEventListener('click', (e) => {
    let filmText = textArea.value;
    result.innerText = movieDatabase(filmText);

    e.preventDefault();
}) 