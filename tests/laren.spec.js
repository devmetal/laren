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
const renameLambda = "(f,i) => i";

const createTestFiles = () => {
  mkdirSync(path.join(__dirname, 'fs'));
  writeFileSync(path.join(__dirname, 'fs', 'demo1'), '');
  writeFileSync(path.join(__dirname, 'fs', 'demo2'), '');
  writeFileSync(path.join(__dirname, 'fs', 'demo3'), '');
};

const deleteTestFiles = () => exec(`rm -rf ${path.join(__dirname, 'fs')}`);

test('laren command line', async (t) => {
  createTestFiles()
  
  await exec(`node ${executable} "${pattern}" "${renameLambda}"`);
  
  const files = readdirSync(path.join(__dirname, 'fs'));
  await deleteTestFiles();

  t.deepEqual(files, ['0','1','2']);
});
