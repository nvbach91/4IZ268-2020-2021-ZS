setTimeout(scrollToRightBlock, 100);

function scrollToRightBlock() {
   document.getElementsByClassName('right')[0].scrollIntoView({ behavior: 'smooth', block: 'start'})
}

function scrollToTop() {
    document.getElementsByClassName('main')[0].scrollIntoView({ behavior: 'smooth', block: 'start'})
}

function checkIfAtTop(){

    let scrollTopButton = document.getElementsByClassName('scroll-top-button')[0];
    let html = document.getElementsByTagName("html")[0];

    if(html.scrollTop <= 500){
        scrollTopButton.style.visibility = 'hidden';
        scrollTopButton.style.opacity = '0'
    } else {
        scrollTopButton.style.visibility = 'visible';
        scrollTopButton.style.opacity = '1';
    }
}
