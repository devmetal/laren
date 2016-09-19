const ch = require('child_process');
const doExec = ch.exec;

const exec = command => new Promise((resolve, reject) => {
  doExec(command, (error, stdout, stderr) => {
    if (error) reject(error);
    if (stderr) reject(stderr);
    resolve(stdout);
  });
});

module.exports = exec;
