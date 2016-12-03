const { PassThrough } = require('stream');
const StreamBuffer = require('./streambuffer');
const readline = require('readline');

const CLI_END = ':exit';

module.exports = (istream) => {
  const input = istream || process.stdin;
  const output = process.stdout;

  const reader = readline.createInterface({
    input,
    output,
    prompt: '> ',
  });

  const lines = new PassThrough();

  reader.prompt();

  reader.on('line', (data) => {
    const line = data.trim();
    if (line === CLI_END) {
      lines.push(null);
      reader.close();
    } else {
      lines.push(`${line}\n`);
      reader.prompt();
    }
  });

  return StreamBuffer.readAllFrom(lines);
};
