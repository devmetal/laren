const Buffer = require('buffer').Buffer;
const stream = require('stream');
const util = require('util');

util.inherits(StreamBuffer, stream.Transform);

function StreamBuffer(size) {
  if (!(this instanceof StreamBuffer)) {
    return new StreamBuffer();
  }

  this._size = size || 256;
  this._length = 0;
  this._factor = 2;
  this._buffer = new Buffer(this._size);

  stream.Transform.call(this);
}

StreamBuffer.prototype.getBuffer = function () {
  return this._buffer;
};

StreamBuffer.prototype.getContent = function () {
  return this._buffer.toString('utf-8', 0, this._length);
};

StreamBuffer.prototype._transform = function (chunk, enc, done) {
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
};

StreamBuffer.prototype.end = function () {
  this.emit("end", this.getContent());
};

StreamBuffer.readAllFrom = (readable) => new Promise((resolve, reject) => 
    readable.pipe(StreamBuffer()).on('end', resolve).on('error', reject));

module.exports = StreamBuffer;
