// @flow

const { Buffer } = require('buffer');
const { Transform, Readable } = require('stream');

class StreamBuffer extends Transform {
  size: number;
  length: number = 0;
  factor: number = 0;
  buffer: Buffer;

  constructor(size: number = 256) {
    super();

    this.size = size;
    this.buffer = new Buffer(this.size);
    this.factor = 2;
  }

  getBuffer(): Buffer {
    return this.buffer;
  }

  getContent(): string {
    return this.buffer.toString('utf-8', 0, this.length);
  }

  _transform(chunk: Buffer, enc: string, done: Function) {
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

  static readAllFrom(readable: Readable): Promise<mixed> {
    return  new Promise((resolve, reject) =>
      readable.pipe(new StreamBuffer()).on('end', resolve).on('error', reject));
  }
}

module.exports = StreamBuffer;
