const createUserFunction = require('./eval');

module.exports = function laren(pattern, lambda, isTest) {
  const userFn = createUserFunction(lambda);
  if (!userFn) {
    process.exit(1);
  }

  const glob = require('glob');
  const path = require('path');
  const fs = require('fs');

  const rename = (oldpath, newpath) => new Promise((resolve, reject) => {
    fs.rename(oldpath, newpath, err => {
      if (err) reject(err);
      resolve();
    });
  });

  const findFiles = () => new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });

  (async function(){
    let files;
    
    try {
      files = await findFiles();
    } catch(err) {
      console.log('Invalid path given');
      return;
    } 

    const tasks = [];

    for (const [index, file] of files.entries()) {
      const dirname = path.dirname(file);
      const basename = path.basename(file);
      const newName = userFn(basename, index);
      const newPath = path.join(dirname, newName);
      console.log(file, '==>', newPath);

      if (isTest) {
        tasks.push(Promise.resolve());
      } else {
        tasks.push(rename(file, newPath));
      }
    }

    try {
      await Promise.all(tasks);
      console.log((isTest) ? 'Tests done!': 'Rename done!')
    } catch(e) {
      console.log('Something wrong happend!');
      console.log('Check your syntax');
    }
  })();
};