'use strict';

var log = require('simple-node-logger').createSimpleLogger();

module.exports = function createUserFunc(code) {
  try {
    var fn = eval(code); // eslint-disable-line no-eval
    if (!(typeof fn === 'function')) {
      log.error('No function given');
      return false;
    }
    return fn;
  } catch (e) {
    log.error('Error in your function! Check syntax');
    log.error(e.message);
    log.error(e.stack);
    return false;
  }
};