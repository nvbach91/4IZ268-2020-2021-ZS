const userForm = document.querySelector('#user-form')
const atInput = document.querySelector('#at-input')
const searchButton = document.querySelector('#search-button')


const userAtValue = atInput.value;

const createUser = (userAtValue) => {
    const userAtContainer = document.createElement('div')
    userAtContainer.classList.add('at_input')
    userAtContainer.innerText = userAtValue;
}

