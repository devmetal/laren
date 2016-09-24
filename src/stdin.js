const stream = require('stream');
const StreamBuffer = require('./streambuffer');
const { Buffer } = require('buffer');

const CLI_END = '\n:exit';

class Cli extends stream.Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, done) {
    const line = chunk.toString();
    if (line.startsWith(CLI_END)) {
      this.emit('exit');
      this.push(null);
    } else {
      this.push(chunk);
    }
    done();
  }
}

class StdIn extends stream.Transform {
  constructor(options) {
    super(options);
    this._chunks = [];
    this._line = [];
  }

  _transform(chunk, encoding, done) {
    const chr = chunk.toString();
    const nl = chr.indexOf('\n');

    if (nl === -1) {
      this._line.push(chunk);
    } else {
      const line = chr.substring(0, nl);
      const rem = chr.substring(nl);

      this.push(Buffer.concat([
        ...this._line, new Buffer(line)
      ]));

      this._line = [new Buffer(rem)];
    }

    done();
  }
}

module.exports = function (istream) {
  const input = istream || process.stdin;
  const stdin = new StdIn();
  const cli = new Cli();
  const stream = input.pipe(stdin).pipe(cli);

  cli.once('exit', () => {
    input.unpipe(stdin);
    input.end();
  });

  return StreamBuffer.readAllFrom(stream);
}
