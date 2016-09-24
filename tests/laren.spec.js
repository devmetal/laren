import test from 'ava';
import path from 'path';
import laren from '../src/laren';
import {
  exec,
  createTestFiles,
  removeTestFiles
} from './helper';

const testDir = path.join(__dirname, 'fs');
const pattern = `${testDir}/**/*`;
const renameLambda = "(f,i) => i";

test('laren command line', async (t) => {
  createTestFiles(testDir);
  await laren(pattern, renameLambda, false);
  const files = removeTestFiles(testDir);
  t.deepEqual(files, ['0','1','2']);
});
