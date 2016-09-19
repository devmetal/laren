import test from 'ava';
import path from 'path';
import exec from './helper';

import {
  mkdirSync,
  writeFileSync,
  readdirSync,
} from 'fs';

const executable = path.join(__dirname, '/../es2015/index');
const pattern = `${path.join(__dirname, 'fs')}/**/*`;
const renameLambda = `(f,i) => 'demo' + i`;

const createTestFiles = () => {
  mkdirSync(path.join(__dirname, 'fs'));
  writeFileSync(path.join(__dirname, 'fs', 'demo1'), '');
  writeFileSync(path.join(__dirname, 'fs', 'demo2'), '');
  writeFileSync(path.join(__dirname, 'fs', 'demo3'), '');
};

const deleteTestFiles = () => exec(`rm -rf ${path.join(__dirname, 'fs')}`);

test.before('laren command line', () => createTestFiles());
test.after('laren command line', async () => await deleteTestFiles());
test('laren command line', async (t) => {
  await exec(`node ${executable} "${pattern}" "${renameLambda}"`);
  const files = readdirSync(path.join(__dirname, 'fs'));
  t.deepEqual(files, [
    'demo0',
    'demo1',
    'demo2'
  ]);
});
