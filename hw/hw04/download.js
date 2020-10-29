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
    'https://eso.vse.cz/~horl13/cv04/hw04/',
'https://eso.vse.cz/~jedv00/cv04/hw04/',
'https://eso.vse.cz/~apai00/cv04/hw04/',
'https://eso.vse.cz/~ulvo00/cv04/hw04/',
'https://eso.vse.cz/~prod10/cv04/hw04/',
'https://eso.vse.cz/~pryp00/cv04/hw04/',
'https://eso.vse.cz/~pinl01/cv04/hw04/',
'https://eso.vse.cz/~pivt02/cv04/hw04/',
'https://eso.vse.cz/~potp04/cv04/hw04/',
'https://eso.vse.cz/~toho00/cv04/hw04/',
'https://eso.vse.cz/~fouf00/cv04/hw04/',
'https://eso.vse.cz/~novd35/cv04/hw04/',
'https://eso.vse.cz/~valm08/cv04/hw04/',
'https://eso.vse.cz/~vetj00/cv04/hw04/',
'https://eso.vse.cz/~seip00/cv04/hw04/',
'https://eso.vse.cz/~ngut37/cv04/hw04/',
'https://eso.vse.cz/~sinj04/cv04/hw04/',
'https://eso.vse.cz/~zofm00/cv04/hw04/',
'https://eso.vse.cz/~novb12/cv04/hw04/',
'https://eso.vse.cz/~zidd00/cv04/hw04/',
'https://eso.vse.cz/~kham06/cv04/hw04/',
'https://eso.vse.cz/~dinv00/cv04/hw04/',
'https://eso.vse.cz/~stea11/cv04/hw04/',
'https://eso.vse.cz/~mikt05/cv04/hw04/',
'https://eso.vse.cz/~pfej00/cv04/hw04/',
'https://eso.vse.cz/~patl03/cv04/hw04/',
'https://eso.vse.cz/~sikj01/cv04/hw04/',
'https://eso.vse.cz/~mrkm00/cv04/hw04/',
'https://eso.vse.cz/~podj00/cv04/hw04/',
'https://eso.vse.cz/~gerv03/cv04/hw04/',
'https://eso.vse.cz/~bejt02/cv04/hw04/',
'https://eso.vse.cz/~stey04/cv04/hw04/',
'https://eso.vse.cz/~kozo01/cv04/hw04/',
'https://eso.vse.cz/~posn01/cv04/hw04',
'https://eso.vse.cz/~vecs00/cv04/hw04/',
'https://eso.vse.cz/~klep03/cv04/hw04/',
'https://eso.vse.cz/~ruzv01/cv04/hw04/',
'https://eso.vse.cz/~doss02/cv04/hw04/',
'https://eso.vse.cz/~tomm08/cv04/hw04/task.html',
'https://eso.vse.cz/~kyvt00/cv04/hw04/',
'https://eso.vse.cz/~kasm13/cv04/hw04/',
];

bluebird.each(urls, (url) => {
    return axios.get(url).then((resp) => {
        const filePath = `./original/${url.split('/').slice(3).join('/').slice(1).replace('cv04/hw04/', '')}/index.html`;
        // ensureDirectoryExistence(filePath);
        // fs.writeFileSync(filePath, resp.data);
        resp.data.split(/[\r\n]+/).forEach((line) => {
            if (line.includes('<link')) {
                const stylesFile = line.split('href="')[1].split('"')[0];
                axios.get(url + stylesFile).then((resp) => {
                    
                    fs.writeFileSync(filePath.replace('index.html', stylesFile), resp.data);
                }).catch((e) => {});
            }
        })
    }).catch((err) => {
        console.log(url);
    });
});


/* corrections

    'https://eso.vse.cz/~pinl01/cv03/index.html',
    'https://eso.vse.cz/~pinl01/cv03/cheatsheet.html',
    'https://eso.vse.cz/~pinl01/cv03/blog.html',
    'https://eso.vse.cz/~pinl01/cv03/resume.html',
    'https://eso.vse.cz/~sinj04/cv03/index.html',
    'https://eso.vse.cz/~sinj04/cv03/cheatsheet.html',
    'https://eso.vse.cz/~sinj04/cv03/blog.html',
    'https://eso.vse.cz/~sinj04/cv03/resume.html',
    'https://eso.vse.cz/~podj00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~podj00/cv03/index.html',
    'https://eso.vse.cz/~podj00/cv03/resume.html',
    'https://eso.vse.cz/~podj00/cv03/blog.html',
    'https://eso.vse.cz/~zofm00/cv03/index.html',
    'https://eso.vse.cz/~zofm00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~zofm00/cv03/blog.html',
    'https://eso.vse.cz/~zofm00/cv03/resume.html',
    'https://eso.vse.cz/~seip00/cv03/index.html',
    'https://eso.vse.cz/~seip00/cv03/blog.html',
    'https://eso.vse.cz/~seip00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~seip00/cv03/resume.html',
    'https://eso.vse.cz/~posn01/cv03/index.html',
    'https://eso.vse.cz/~posn01/cv03/blog.html',
    'https://eso.vse.cz/~posn01/cv03/cheatsheet.html',
    'https://eso.vse.cz/~posn01/cv03/resume.html',
    'https://eso.vse.cz/~potp04/cv03/cheatsheet.html',
    'https://eso.vse.cz/~potp04/cv03/index.html',
    'https://eso.vse.cz/~potp04/cv03/blog.html',
    'https://eso.vse.cz/~potp04/cv03/resume.html',
    'https://eso.vse.cz/~ruzv01/cv03/index.html',
    'https://eso.vse.cz/~ruzv01/cv03/cheatsheet.html',
    'https://eso.vse.cz/~ruzv01/cv03/blog.html',
    'https://eso.vse.cz/~ruzv01/cv03/resume.html',
    'https://eso.vse.cz/~sikj01/cv03/index.html',
    'https://eso.vse.cz/~sikj01/cv03/Blog.html',
    'https://eso.vse.cz/~sikj01/cv03/Cheatsheet.html',
    'https://eso.vse.cz/~sikj01/cv03/Resume.html',
    'https://eso.vse.cz/~mrkm00/cv03/index.html',
    'https://eso.vse.cz/~mrkm00/cv03/blog.html',
    'https://eso.vse.cz/~mrkm00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~mrkm00/cv03/resume.html',
    'https://eso.vse.cz/~stea11/cv03/index.html',
    'https://eso.vse.cz/~stea11/cv03/cheatsheet.html',
    'https://eso.vse.cz/~stea11/cv03/blog.html',
    'https://eso.vse.cz/~stea11/cv03/resume.html',
    'https://eso.vse.cz/~kozo01/cv03/resume.html',
    'https://eso.vse.cz/~kozo01/cv03/cheatsheet.html',
    'https://eso.vse.cz/~kozo01/cv03/blog.html',
    'https://eso.vse.cz/~kozo01/cv03/index.html',
    'https://eso.vse.cz/~pryp00/cv03/index.html',
    'https://eso.vse.cz/~pryp00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~pryp00/cv03/blog.html',
    'https://eso.vse.cz/~pryp00/cv03/resume.html',
    'https://eso.vse.cz/~fouf00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~fouf00/cv03/index.html',
    'https://eso.vse.cz/~fouf00/cv03/resume.html',
    'https://eso.vse.cz/~fouf00/cv03/blog.html',
    'https://eso.vse.cz/~jedv00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~jedv00/cv03/index.html',
    'https://eso.vse.cz/~jedv00/cv03/resume.html',
    'https://eso.vse.cz/~jedv00/cv03/blog.html',
    'https://eso.vse.cz/~klep03/cv03/index.html',
    'https://eso.vse.cz/~klep03/cv03/cheatSheet.html',
    'https://eso.vse.cz/~klep03/cv03/blog.html',
    'https://eso.vse.cz/~klep03/cv03/resume.html',
    'https://eso.vse.cz/~kasm13/cv03/cheat_sheet.html',
    'https://eso.vse.cz/~kasm13/cv03/index.html',
    'https://eso.vse.cz/~kasm13/cv03/resume.html',
    'https://eso.vse.cz/~kasm13/cv03/blog.html',
    'https://eso.vse.cz/~tomm08/cv03/index.html',
    'https://eso.vse.cz/~tomm08/cv03/cheatsheet.html',
    'https://eso.vse.cz/~tomm08/cv03/blog.html',
    'https://eso.vse.cz/~tomm08/cv03/resume.html',
    'https://eso.vse.cz/~doss02/cv02/index.html',
    'https://eso.vse.cz/~doss02/cv02/cheatsheet.html',
    'https://eso.vse.cz/~doss02/cv02/blog.html',
    'https://eso.vse.cz/~doss02/cv02/resume.html',
    'https://eso.vse.cz/~toho00/cv03/index.html',
    'https://eso.vse.cz/~toho00/cv03/blog.html',
    'https://eso.vse.cz/~toho00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~toho00/cv03/resume.html',
    'https://eso.vse.cz/~dinv00/cv03/index.html',
    'https://eso.vse.cz/~dinv00/cv03/blog.html',
    'https://eso.vse.cz/~dinv00/cv03/cheatsheet.html',
    'https://eso.vse.cz/~dinv00/cv03/resume.html',

*/