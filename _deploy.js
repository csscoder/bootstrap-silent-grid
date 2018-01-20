//Rsync
const Rsync = require('rsync');
const pkg = require('./package.json');
const access = require('./_accessDeploy.json');

console.log(`path: ${__dirname}/build/`);

const directory = pkg.name;
const localPath = 'build/';
const hostname = access.hostname;
const username = access.username;
const port = access.port;
const hostDestination = `${access.hostDestination}${directory}`;
const rsync = new Rsync()
.set('progress')
.shell(`ssh -p ${port}`)
.exclude(['.git', '.DS_Store'])
.set('delete')
.flags('av')
.source(localPath)
.destination(`${username}@${hostname}:${hostDestination}/`);

rsync.execute(function (error, code, cmd) {
    if (error) {
        console.log(error);
    }
    if (code === 0) {
        console.log(`Deployed 'build/' to ${username}@${hostname}:${hostDestination}/`);
        console.log(`https://dev.csscoder.pro/${directory}/`);
    }
});
