// @flow

import type { Readable } from 'stream';

const split = require('split');
const { EventEmitter } = require('events');

module.exports = (istream: ?Readable): EventEmitter => {
  const files = new EventEmitter();
  const input: Readable = istream || process.stdin;
  const stream = input.pipe(split());

  stream.on('data', (file: File) => {
    files.emit('file', file);
  });

  stream.on('end', () => {
    files.emit('end');
  });

  return files;
}
