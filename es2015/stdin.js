'use strict';

var StreamBuffer = require('./streambuffer');

module.exports = function readFromStdin() {
  return new Promise(function (resolve, reject) {
    process.stdin.pipe(StreamBuffer()).on('end', function (input) {
      resolve(input);
    }).on('error', function (err) {
      reject(err);
    });

    process.stdin.resume();
  });
};