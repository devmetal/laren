import test from 'ava';
import path from 'path';
import {
  exec,
  createTestFiles,
  removeTestFiles
} from './helper';

const testDir = path.join(__dirname, 'fs');
const executable = path.join(__dirname, '/../es2015/index');
const pattern = `${testDir}/**/*`;
const renameLambda = "(f,i) => i";

test('laren command line', async (t) => {
  let files;

  createTestFiles(testDir);
  await exec(`node ${executable} "${pattern}" "${renameLambda}"`);
  files = removeTestFiles(testDir);
  t.deepEqual(files, ['0','1','2']);

  createTestFiles(testDir);
  await exec(`echo "${renameLambda}" | node ${executable} "${pattern}"`);
  files = removeTestFiles(testDir);
  t.deepEqual(files, ['0','1','2']);
});

