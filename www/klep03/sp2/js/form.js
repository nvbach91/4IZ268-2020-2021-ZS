const contactMethod = [];
let contactMethodValue;
const chooseTime = document.querySelector('#choose-time');
let chooseTimeisHidden = false;
contactMethod[0] = document.querySelector('#contact-method-phone');
contactMethod[1] = document.querySelector('#contact-method-email');

for (let a = 0; a<2; a++) {
    contactMethod[a].addEventListener('click', () => {
        if (a === 0 && chooseTime.classList.contains('hidden')) {
            chooseTime.classList.remove('hidden');
            console.log('I displayed the calendar. ');
        }
        if(a === 1) {
            chooseTime.classList.add('hidden');
            console.log('I hid the calendar. ');
        }
    });
}


contactMethod[1] = document.querySelector('#contact-method-email');

