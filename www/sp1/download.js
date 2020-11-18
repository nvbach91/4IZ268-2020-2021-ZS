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
    'https://eso.vse.cz/~valm08/sp1/index.html',
    'https://eso.vse.cz/~valm08/sp1/pc.html',
    'https://eso.vse.cz/~valm08/sp1/sw.html',
    'https://eso.vse.cz/~valm08/sp1/acs.html',
    'https://eso.vse.cz/~valm08/sp1/ref.html',
    'https://eso.vse.cz/~valm08/sp1/assets/css/default.css',
];

bluebird.each(urls, (url) => {
    return axios.get(url).then((resp) => {
        const parts = url.split('/');
        const xname = parts[3].replace('~', '');
        const file = parts.slice(5).join('/');
        const filePath = `./${xname}/${file.includes('.') ? file : `${file}index.html`}`;
        // console.log(filePath);
        ensureDirectoryExistence(filePath);
        fs.writeFileSync(filePath, resp.data);
    }).catch((err) => {
        console.log(url);
    });
});
