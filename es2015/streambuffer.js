'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('buffer');

var Buffer = _require.Buffer;

var _require2 = require('stream');

var Transform = _require2.Transform;

var StreamBuffer = function (_Transform) {
  _inherits(StreamBuffer, _Transform);

  function StreamBuffer(size) {
    _classCallCheck(this, StreamBuffer);

    var _this = _possibleConstructorReturn(this, (StreamBuffer.__proto__ || Object.getPrototypeOf(StreamBuffer)).call(this));

    _this._size = size || 256;
    _this._length = 0;
    _this._buffer = new Buffer(_this._size);
    _this._factor = 2;
    return _this;
  }

  _createClass(StreamBuffer, [{
    key: 'getBuffer',
    value: function getBuffer() {
      return this._buffer;
    }
  }, {
    key: 'getContent',
    value: function getContent() {
      return this._buffer.toString('utf-8', 0, this._length);
    }
  }, {
    key: '_transform',
    value: function _transform(chunk, enc, done) {
      if (!chunk) {
        this.emit("end", this.getContent());
        return done();
      }

      if (this._length + chunk.length > this._size) {
        var size = this._length + chunk.length * this._factor;
        var buffer = new Buffer(size);
        this._buffer.copy(buffer, 0, 0, this._length);
        this._buffer = buffer;
        this._size = size;
      }

      chunk.copy(this._buffer, this._length, 0);
      this._length += chunk.length;

      this.push(chunk);
      done();
    }
  }, {
    key: 'end',
    value: function end() {
      this.emit("end", this.getContent());
    }
  }]);

  return StreamBuffer;
}(Transform);

StreamBuffer.readAllFrom = function (readable) {
  return new Promise(function (resolve, reject) {
    return readable.pipe(new StreamBuffer()).on('end', resolve).on('error', reject);
  });
};

module.exports = StreamBuffer;