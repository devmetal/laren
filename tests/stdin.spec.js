import test from 'ava';
import stdin from '../src/stdin';
import { createReadStream } from 'fs';
import { join } from 'path';

test.cb('stdin can read line by line', (t) => {
  const istream = createReadStream(join(__dirname, 'files.txt'));
  const files = stdin(istream);
  
  const readed = [];

  files.on('end', () => {
    t.is(readed.length, 50);
    t.end();
  });

  files.on('file', (f) => {
    readed.push(f);
  })
});
