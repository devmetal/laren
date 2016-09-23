const StreamBuffer = require('./streambuffer');

module.exports = function readFromStdin() {
  return new Promise((resolve, reject) => {
    process.stdin
      .pipe(StreamBuffer())
      .on('end', (input) => {
        resolve(input);
      })
      .on('error', (err) => {
        reject(err);
      });
    
    process.stdin.resume();
  });
}
