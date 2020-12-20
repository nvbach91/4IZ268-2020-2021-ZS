const articleForm = document.querySelector('#article-form');
const headingInput = document.querySelector('.article-heading')
const contentInput = document.querySelector('.article-content')
const enclosureInput = document.querySelector('.article-enclosure')

articleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const headingInputValue = headingInput.value;
    const contentInputValue = contentInput.value;
    const eclosureInputValue = enclosureInput.value;
    console.log(headingInputValue);
    console.log(contentInputValue);
    console.log(eclosureInputValue);
});