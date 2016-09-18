#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var prog = require('commander');
var laren = require('./laren');

prog.version('1.0.0').usage('<options> [pattern] [function]').arguments('[pattern] [function]').option('-t, --test', 'Not actualy rename, just test renaming function').action(function (pattern, fun) {
  return laren(pattern, fun, prog.test);
});

prog.parse(process.argv);