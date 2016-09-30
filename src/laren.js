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

const renameFiles = (files, userFn, isTest) => {
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

const findFiles = pattern => new Promise((resolve, reject) => {
  glob(pattern, (err, files) => {
    if (err) reject(err);
    resolve(files);
  });
});

module.exports = async function laren(pattern, lambda, isTest) {
  const userFn = createUserFunction(lambda);
  if (!userFn) {
    throw new Error('No function given!');
  }

  const files = await findFiles(pattern);
  return renameFiles(files, userFn, isTest);
};
