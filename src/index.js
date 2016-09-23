#!/usr/bin/env node
require('babel-polyfill');

const prog = require('commander');
const laren = require('./laren');

prog
  .version('1.0.0')
  .usage('<options> [pattern] <function>')
  .arguments('[pattern] <function>')
  .option('-t, --test', 'Not actualy rename, just test renaming function')
  .action((pattern, fun) => {
    return laren(pattern, fun, prog.test);
  });

prog.parse(process.argv);
