// @flow

const createUserFunction = require('./eval');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const rename = (oldpath, newpath) => new Promise((resolve, reject) => {
  fs.rename(oldpath, newpath, (err) => {
    if (err) reject(err);
    resolve();
  });
});

const renameFiles = (files: Files, userFn: UserFn, isTest: boolean) => {
  const tasks = [];

  for (const [index, file] of files.entries()) {
    const dirname = path.dirname(file);
    const basename = path.basename(file);
    const newName = userFn(basename, index).toString();
    const newPath = path.join(dirname, newName);

    console.log(file, '==>', newPath);

    if (isTest) {
      tasks.push(Promise.resolve());
    } else {
      tasks.push(rename(file, newPath));
    }
  }

  return Promise.all(tasks);
};

const findFiles = (pattern: string): Promise<Files> => new Promise((resolve, reject) => {
  glob(pattern, (err, files: Files) => {
    if (err) reject(err);
    resolve(files);
  });
});

module.exports = async function laren(pattern: string, lambda: string, isTest: boolean) {
  const userFn: UserFn = createUserFunction(lambda);
  const files: Files = await findFiles(pattern);
  return renameFiles(files, userFn, isTest);
};
