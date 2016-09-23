import test from 'ava';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
import { inherits } from 'util';
import StreamBuffer from '../src/streambuffer';

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

function NullStream() {
    Readable.call(this);
}

NullStream.prototype._read = function() {
    this.push(null);
}

FakeStream.create = () => new FakeStream(new Buffer('Hello world\n', 'utf-8'));
NullStream.create = () => new NullStream();

test('BufferStream can read from readable stream to a buffer', async (t) => {
    const content = await StreamBuffer.readAllFrom(FakeStream.create());
    t.is('Hello world\n', content);
});
