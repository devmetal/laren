const ch = require('child_process');
const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const doExec = ch.exec;

const exec = command => new Promise((resolve, reject) => {
  doExec(command, (error, stdout, stderr) => {
    if (error) reject(error);
    if (stderr) reject(stderr);
    resolve(stdout);
  });
});

const createTestFiles = (dir) => {
  fse.ensureFileSync(path.join(dir, 'demo1'));
  fse.ensureFileSync(path.join(dir, 'demo2'));
  fse.ensureFileSync(path.join(dir, 'demo3'));
};

const removeTestFiles = (dir) => {
  const files = fs.readdirSync(dir);
  fse.removeSync(dir);
  return files;
};

module.exports = { exec, createTestFiles, removeTestFiles };
