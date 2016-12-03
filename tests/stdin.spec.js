import test from 'ava';
import stdin from '../src/stdin';
import { Readable } from 'stream';
import { inherits } from 'util';

inherits(FakeStream, Readable);

function FakeStream(buffer) {
    Readable.call(this);
    this._buffer = buffer;
    this._size = buffer.length;
    this._i = 0;
}

FakeStream.prototype._read = function () {
    let i = this._i++;
    if (i > this._size) {
        this.push(null);
    } else {
        const bf = this._buffer.slice(i, i + 1);
        this.push(bf);
    }
};

FakeStream.prototype.end = function () {
    this.push(null);
}

test('stdin can read from a stream and buffer that until :exit', async (t) => {
  const fake = new FakeStream(new Buffer('Hello\nWorld\n:exit\ncontentisgoingon'))
  const content = await stdin(fake);
  t.is(content, 'Hello\nWorld\n');
});
