'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stream = require('stream');
var StreamBuffer = require('./streambuffer');

var _require = require('buffer');

var Buffer = _require.Buffer;


var CLI_END = '\n:exit';

var Cli = function (_stream$Transform) {
  _inherits(Cli, _stream$Transform);

  function Cli(options) {
    _classCallCheck(this, Cli);

    return _possibleConstructorReturn(this, (Cli.__proto__ || Object.getPrototypeOf(Cli)).call(this, options));
  }

  _createClass(Cli, [{
    key: '_transform',
    value: function _transform(chunk, encoding, done) {
      var line = chunk.toString();
      if (line.startsWith(CLI_END)) {
        this.emit('exit');
        this.push(null);
      } else {
        this.push(chunk);
      }
      done();
    }
  }]);

  return Cli;
}(stream.Transform);

var StdIn = function (_stream$Transform2) {
  _inherits(StdIn, _stream$Transform2);

  function StdIn(options) {
    _classCallCheck(this, StdIn);

    var _this2 = _possibleConstructorReturn(this, (StdIn.__proto__ || Object.getPrototypeOf(StdIn)).call(this, options));

    _this2._chunks = [];
    _this2._line = [];
    return _this2;
  }

  _createClass(StdIn, [{
    key: '_transform',
    value: function _transform(chunk, encoding, done) {
      var chr = chunk.toString();
      var nl = chr.indexOf('\n');

      if (nl === -1) {
        this._line.push(chunk);
      } else {
        var line = chr.substring(0, nl);
        var rem = chr.substring(nl);

        this.push(Buffer.concat([].concat(_toConsumableArray(this._line), [new Buffer(line)])));

        this._line = [new Buffer(rem)];
      }

      done();
    }
  }]);

  return StdIn;
}(stream.Transform);

module.exports = function (istream) {
  var input = istream || process.stdin;
  var stdin = new StdIn();
  var cli = new Cli();
  var stream = input.pipe(stdin).pipe(cli);

  cli.once('exit', function () {
    input.unpipe(stdin);
    input.end();
  });

  return StreamBuffer.readAllFrom(stream);
};