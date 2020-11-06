const fs = require('fs');
const path = require('path');
const axios = require('axios');
const bluebird = require('bluebird');
const ensureDirectoryExistence = (filePath) => {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
};
const urls = [
    // 'https://eso.vse.cz/~fral06/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~fral06/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~fral06/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~fral06/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~vavl03/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~vavl03/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~vavl03/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~vavl03/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~novd35/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~novd35/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~novd35/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~novd35/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~apai00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~apai00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~apai00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~apai00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~pivt02/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~pivt02/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~pivt02/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~pivt02/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~ulvo00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~ulvo00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~ulvo00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~ulvo00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~vecs00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~vecs00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~vecs00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~vecs00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~prod10/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~prod10/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~prod10/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~prod10/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~pinl01/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~pinl01/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~pinl01/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~pinl01/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~novb12/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~novb12/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~novb12/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~novb12/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~toho00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~toho00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~toho00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~toho00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~zidd00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~zidd00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~zidd00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~zidd00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~jedv00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~jedv00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~jedv00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~jedv00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~sikj01/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~sikj01/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~sikj01/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~sikj01/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~sinj04/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~sinj04/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~sinj04/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~sinj04/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~zofm00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~zofm00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~zofm00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~zofm00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~potp04/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~potp04/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~potp04/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~potp04/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~stea11/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~stea11/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~stea11/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~stea11/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~dinv00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~dinv00/cv06/homework/assets/task-dashboard.css',
    // 'https://eso.vse.cz/~dinv00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~dinv00/cv06/homework/assets/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~seip00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~seip00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~seip00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~seip00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~vetj00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~vetj00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~vetj00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~vetj00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~ngut37/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~ngut37/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~ngut37/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~ngut37/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~mrkm00/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~mrkm00/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~mrkm00/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~mrkm00/cv06/homework/task-dashboard-with-content.css',
    // 'https://eso.vse.cz/~posn01/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~posn01/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~kham06/cv06/homework/task-dashboard.html',
    // 'https://eso.vse.cz/~kham06/cv06/homework/task-dashboard.css',
    // 'https://eso.vse.cz/~kham06/cv06/homework/task-dashboard-with-content.html',
    // 'https://eso.vse.cz/~kham06/cv06/homework/task-dashboard-with-content.css',

    'https://eso.vse.cz/~kasm13/cv06/homework/task-dashboard.html',
    'https://eso.vse.cz/~kasm13/cv06/homework/task-dashboard.css',
    'https://eso.vse.cz/~kasm13/cv06/homework/task-dashboard-with-content.html',
    'https://eso.vse.cz/~kasm13/cv06/homework/task-dashboard-with-content.css',

    
'https://eso.vse.cz/~posn01/cv06/homework/task-dashboard-with-content.html',
'https://eso.vse.cz/~posn01/cv06/homework/task-dashboard-with-content.css',
];

bluebird.each(urls, (url) => {
    return axios.get(url).then((resp) => {
        const parts = url.split('/');
        const xname = parts[3].replace('~', '');
        const file = parts.slice(6).join('/');
        const filePath = `./original/${xname}/${file}`;
        ensureDirectoryExistence(filePath);
        fs.writeFileSync(filePath, resp.data);
    }).catch((err) => {
        console.log(url);
    });
});
