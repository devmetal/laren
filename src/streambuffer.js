// @flow

'use strict';

const { Transform, Readable } = require('stream');

class StreamBuffer extends Transform {
  size: number;
  length: number;
  factor: number;
  buffer: Buffer;

  constructor(size: number = 256) {
    super();

    this.size = size;
    this.buffer = new Buffer(this.size);
    this.factor = 2;
    this.length = 0;
  }

  getBuffer(): Buffer {
    return this.buffer;
  }

  getContent(): string {
    return this.buffer.toString('utf-8', 0, this.length);
  }

  _transform(chunk: Buffer | string, enc: string, done: Function) {
    const ch: Buffer = new Buffer(chunk);

    if (this.length + chunk.length > this.size) {
      const size = this.length + (ch.length * this.factor);
      const buffer = new Buffer(size);
      this.buffer.copy(buffer, 0, 0, this.length);
      this.buffer = buffer;
      this.size = size;
    }

    ch.copy(this.buffer, this.length, 0);
    this.length += chunk.length;

    this.push(chunk);
    return done();
  }

  static readAllFrom(readable: Readable): Promise<string> {
    return new Promise((resolve, reject) => {
      const buff = new StreamBuffer();

      readable.on('end', () => resolve(buff.getContent()));
      readable.on('error', (err) => reject(err));

      readable.pipe(buff);
    });
  }
}

module.exports = StreamBuffer;
