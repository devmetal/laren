#!/usr/bin/env node

// @flow

require('babel-polyfill');

const prog = require('commander');
const laren = require('./laren');
const stdin = require('./stdin');

const printOutput = (isTest: boolean) => {
  console.log((isTest) ? 'Tests done!' : 'Rename done!');
};

const action = async function action(pattern: string, expression: ?string) {
  try {
    let lambda: string;

    if (expression) {
      lambda = expression;
    } else {
      lambda = await stdin(process.stdin);
    }

    await laren(pattern, lambda, prog.test);
    printOutput(prog.test);
    process.exit(0);
  } catch (err) {
    console.log('Something wrong happend!');
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
  }
};

prog
  .version('1.0.0')
  .usage('<pattern> [function]')
  .arguments('<pattern> [function]')
  .option('-t, --test', 'Not actualy rename, just test renaming function')
  .action((pattern: string, expression: string) => {
    (async function doAction() {
      await action(pattern, expression);
    }());
  });

prog.parse(process.argv);
