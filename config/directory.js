const path = require('path');
const rootPath = path.normalize(__dirname + '/..');

const directory = {
    root: rootPath,
    distDir: rootPath + '/dist',
    assetsDir: rootPath + '/public'
};

module.exports = directory;