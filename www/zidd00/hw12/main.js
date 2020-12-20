const userInput = $('#username');
const searchButton = $('#search');
const infoBox = $('#info-box');
const repoBox = $('#repo-box');
const repoHeading = $('#repo-heading');

const CLIENT_ID = 'd6cc54fc565961948589'; // client_id získáte po registraci OAuth účtu
const CLIENT_SECRET = '932efc922e9d0884a4f7623b34f7b7c7a2fea8ce'; // client_secret získáte po registraci OAuth účtu
const baseApiUrl = 'https://api.github.com';

searchButton.click(() => {
    infoBox.empty();
    repoBox.empty();

    if(userInput.val()) {
        const searchValue = userInput.val();
        const url = `${baseApiUrl}/users/${searchValue}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        const spinner = $('<div class="loader">Loading...</div>');
        infoBox.append(spinner);

        $.getJSON(url).done((user) => {
            fetchRepositories(user.login);
            infoBox.empty();
            renderUser(user);
            repoHeading.show();

        }).fail(() => {
            infoBox.empty();
            const errorMessage = $('<div class="user-info-error">User not found!</div>');
            repoHeading.text('Repos:');
            repoHeading.hide();
            infoBox.append(errorMessage);
        });
    }
    else {
        const errorMessage = $('<div class="user-info-error">You have not entered anything!</div>');
        repoHeading.text('Repos:');
        repoHeading.hide();
        infoBox.append(errorMessage);
    }

    infoBox.css('display', 'flex');
});


const fetchRepositories = (userLogin) => {
    const url = `${baseApiUrl}/users/${userLogin}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    const spinner = $('<div class="loader">Loading...</div>');
    repoBox.append(spinner);

    $.getJSON(url).done((repos) => {
        repoBox.empty();
        let numberOfRepos = 0;
        const items = [];
        repos.forEach((item) => {
            numberOfRepos++;
            const newElement = $(`
            <a href="${item.html_url}" class="repo-link" target="_blank">
                <div class="repo">
                    ${item.name}
                </div>
            </a>
            `);
            items.push(newElement);
        });

        if(numberOfRepos > 0) {
            repoHeading.text('Repos (' + numberOfRepos.toString() + '):');
            repoBox.append(items);
        }
        else {
            const errorMessage = $('<div class="repo">This user has no repos.</div>');
            repoHeading.text('Repos:');
            repoBox.append(errorMessage);
        }

    }).fail(() => {
        repoBox.empty();
        const errorMessage = $('<div class="repo">Repos failed to load.</div>');
        repoHeading.text('Repos:');
        repoBox.append(errorMessage);
    });

    repoBox.show();
};


const renderUser = (user) => {

    const myName = user.name;
    const myLogin = user.login;
    let myBio = user.company;
    let myLocation = user.location;
    let myDescription = user.bio;
    let myTwitter = user.twitter_username;
    const myFollowers = user.followers;
    const myFollowing = user.following;
    const myRegistered = user.created_at;
    const myPicture = user.avatar_url;
    const myProfile = user.html_url;

    if(!myBio) myBio = 'N/A';
    if(!myLocation) myLocation = 'N/A';
    if(!myDescription) myDescription = 'N/A';
    if(!myTwitter) myTwitter = 'N/A';

    const userLeft = $('<div class="user-info-left"></div>');
    infoBox.append(userLeft);
    const userName = $('<h2 id="user-name">Name</h2>');
    userLeft.append(userName);
    if(myName) userName.text(myName);
    else userName.text(myLogin);
    const userPicture = $('<img src="' + myPicture + '" alt="Profile picture" class="user-info-profile-picture">');
    userLeft.append(userPicture);
    const userButton = $('<a href="' + myProfile + '" target="_blank"><button class="user-info-button-view">View profile</button></a>');
    userLeft.append(userButton);

    const userRight = $('<div class="user-info-right"></div>');
    infoBox.append(userRight);
    const detailLogin = $('<div class="user-info-detail">Login: </div>');
    userRight.append(detailLogin);
    detailLogin.text('Login: ' + myLogin);
    const detailBio = $('<div class="user-info-detail">Bio: </div>');
    userRight.append(detailBio);
    detailBio.text('Company: ' + myBio);
    const detailLocation = $('<div class="user-info-detail">Location: </div>');
    userRight.append(detailLocation);
    detailLocation.text('Location: ' + myLocation);
    const detailDescription = $('<div class="user-info-detail">Description: </div>');
    userRight.append(detailDescription);
    detailDescription.text('Description: ' + myDescription);
    const detailTwitter = $('<div class="user-info-detail">Twitter: </div>');
    userRight.append(detailTwitter);
    detailTwitter.text("Twitter: " + myTwitter);
    const detailFollowers = $('<div class="user-info-detail">Followers: </div>');
    userRight.append(detailFollowers);
    detailFollowers.text('Followers: ' + myFollowers);
    const detailFollowing = $('<div class="user-info-detail">Following: </div>');
    userRight.append(detailFollowing);
    detailFollowing.text('Following: ' + myFollowing);
    const detailRegistered = $('<div class="user-info-detail">Registered: </div>');
    userRight.append(detailRegistered);
    detailRegistered.text('Registered: ' + new Date(myRegistered).toLocaleDateString('cs-CZ'));
};