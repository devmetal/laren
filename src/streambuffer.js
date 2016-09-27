const { Buffer } = require('buffer');
const { Transform } = require('stream');

class StreamBuffer extends Transform {
  constructor(size) {
    super();

    this._size = size || 256;
    this._length = 0;
    this._buffer = new Buffer(this._size);
    this._factor = 2;
  }

  getBuffer() {
    return this._buffer;
  }

  getContent() {
    return this._buffer.toString('utf-8', 0, this._length);
  }

  _transform(chunk, enc, done) {
    if (!chunk) {
      this.emit("end", this.getContent());
      return done();
    }

    if (this._length + chunk.length > this._size) {
      const size = this._length + chunk.length * this._factor;
      const buffer = new Buffer(size);
      this._buffer.copy(buffer, 0, 0, this._length);
      this._buffer = buffer;
      this._size = size;
    }

    chunk.copy(this._buffer, this._length, 0);
    this._length += chunk.length;

    this.push(chunk);
    done();
  }

  end() {
    this.emit("end", this.getContent());
  }
}

StreamBuffer.readAllFrom = (readable) => new Promise((resolve, reject) =>
  readable.pipe(new StreamBuffer()).on('end', resolve).on('error', reject));

module.exports = StreamBuffer;
