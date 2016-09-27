const { Buffer } = require('buffer');
const { Transform } = require('stream');

class StreamBuffer extends Transform {
  constructor(size) {
    super();

    this.size = size || 256;
    this.length = 0;
    this.buffer = new Buffer(this.size);
    this.factor = 2;
  }

  getBuffer() {
    return this.buffer;
  }

  getContent() {
    return this.buffer.toString('utf-8', 0, this.length);
  }

  _transform(chunk, enc, done) {
    if (!chunk) {
      this.emit('end', this.getContent());
      return done();
    }

    if (this.length + chunk.length > this.size) {
      const size = this.length + (chunk.length * this.factor);
      const buffer = new Buffer(size);
      this.buffer.copy(buffer, 0, 0, this.length);
      this.buffer = buffer;
      this.size = size;
    }

    chunk.copy(this.buffer, this.length, 0);
    this.length += chunk.length;

    this.push(chunk);
    return done();
  }

  end() {
    this.emit('end', this.getContent());
  }
}

StreamBuffer.readAllFrom = readable => new Promise((resolve, reject) =>
  readable.pipe(new StreamBuffer()).on('end', resolve).on('error', reject));

module.exports = StreamBuffer;
