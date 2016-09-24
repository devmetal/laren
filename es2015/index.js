#!/usr/bin/env node
'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

var prog = require('commander');
var laren = require('./laren');
var stdin = require('./stdin');

var action = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pattern, expression) {
    var lambda, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            lambda = void 0;

            if (!expression) {
              _context.next = 6;
              break;
            }

            lambda = expression;
            _context.next = 9;
            break;

          case 6:
            _context.next = 8;
            return stdin(process.stdin);

          case 8:
            lambda = _context.sent;

          case 9:
            _context.next = 11;
            return laren(pattern, lambda, prog.test);

          case 11:
            result = _context.sent;

            if (result === true) {
              process.exit(0);
            } else {
              process.exit(1);
            }
            _context.next = 20;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            console.log('Error happend!');
            console.log(_context.t0.message);
            console.log(_context.t0.stack);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 15]]);
  }));

  return function action(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

prog.version('1.0.0').usage('<pattern> [function]').arguments('<pattern> [function]').option('-t, --test', 'Not actualy rename, just test renaming function').action(function (pattern, expression) {
  _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return action(pattern, expression);

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }))();
});

prog.parse(process.argv);