$(document).ready(() => {
    const main = $('main');
    const section = $(`<section></section>`);
    const heading = $(`<h2 class="full-heading"></h2>`).text(localStorage.getItem('heading'));
    const content = $(`<p class="full-content"></p>`).html(localStorage.getItem('content'));
    const enclosure = $(`<img alt="image" class="full-enclosure">`).attr("src", localStorage.getItem('enclosure'));
    const secEnclosure = $(`<img alt="image" class="full-enclosure">`).attr("src", localStorage.getItem('secEnclosure'));
    main.append(heading, content, enclosure);
    if (localStorage.getItem('secEnclosure') !== 'undefined') {
        const secEnclosure = $(`<img alt="image" class="full-enclosure">`).attr("src", localStorage.getItem('secEnclosure'));
        main.append(secEnclosure);
    };
    if (localStorage.getItem('thirdEnclosure') !== 'undefined') {
        const thirdEnclosure = $(`<img alt="image" class="full-enclosure">`).attr("src", localStorage.getItem('thirdEnclosure'));
        main.append(thirdEnclosure);
    };
});