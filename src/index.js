#!/usr/bin/env node
require('babel-polyfill');

const prog = require('commander');
const laren = require('./laren');
const stdin = require('./stdin');

const action = async function action(pattern, expression) {
  try {
    let lambda;

    if (expression) {
      lambda = expression;
    } else {
      lambda = await stdin(process.stdin);
    }

    const result = await laren(pattern, lambda, prog.test);
    if (result === true) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.log('Error happend!');
    console.log(err.message);
    console.log(err.stack);
  }
};

prog
  .version('1.0.0')
  .usage('<pattern> [function]')
  .arguments('<pattern> [function]')
  .option('-t, --test', 'Not actualy rename, just test renaming function')
  .action((pattern, expression) => {
    (async function doAction() {
      await action(pattern, expression);
    }());
  });

prog.parse(process.argv);
