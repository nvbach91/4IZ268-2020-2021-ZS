$(document).ready(() => {
    const main = $('main');
    let articleCount = 0;

    var firebaseConfig = {
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

    function getData() {
        firebase.database().ref('Article').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val();
                const headingSource = childData['heading'];
                const contentSource = childData['content'];
                const enclosureSource = childData['enclosure'];
                const secEnclosureSource = childData['secEnclosure'];
                const thirdEnclosureSource = childData['thirdEnclosure'];
                console.log(headingSource);
                const section = $(`<section></section>`);
                const headingAndContent = $(`<div class="heading-and-content"></div>`);
                const heading = $(`<a href="" onclick="openFullArticle();" class="heading-link">${headingSource}</a>`);
                const content = $(`<div class="content-link">${contentSource}</div>`);
                const enclosure = $(`<img src="${enclosureSource}" alt="image" class="enclosure-link">`);
                const secEnclosure = $(`<span class="sec-enclosure">${secEnclosureSource}</span>`);
                const thirdEnclosure = $(`<span class="third-enclosure">${thirdEnclosureSource}</span>`);
                console.log(heading);
                main.append(section);
                section.append(headingAndContent, enclosure, secEnclosure, thirdEnclosure);
                headingAndContent.append(heading, content);
            });
        });
    };

    getData();


    $(document).click(function(e) {
        const clickedHeadingText = $(e.target).text();
        const headingLinkArray = $('.heading-link');
        const contentLinkArray = $('.content-link');
        const enclosureLinkArray = $('.enclosure-link');
        const secEnclosureLinkArray = $('.sec-enclosure');
        const thirdEnclosureLinkArray = $('.third-enclosure');
        /*while (clickedHeadingText !== headingLinkArray.get(i).innerText) {
            i++;
        };
        return i;*/
        for (i = 0; i < headingLinkArray.length; i++) {
            if (clickedHeadingText === headingLinkArray.get(i).innerText) {
                articleCount = i;
            };
        };
        const headingLink = headingLinkArray.get(articleCount);
        const contentLink = contentLinkArray.get(articleCount);
        const enclosureLink = enclosureLinkArray.get(articleCount).getAttribute('src');
        const secEnclosureLink = secEnclosureLinkArray.get(articleCount);
        const thirdEnclosureLink = thirdEnclosureLinkArray.get(articleCount);
        localStorage.setItem('heading', headingLink.innerText);
        localStorage.setItem('content', $(contentLink).html());
        localStorage.setItem('enclosure', enclosureLink);
        localStorage.setItem('secEnclosure', secEnclosureLink.innerText);
        localStorage.setItem('thirdEnclosure', thirdEnclosureLink.innerText);
        headingLink.setAttribute("href", "../articles-full/");
    });
});