'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var createUserFunction = require('./eval');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

var rename = function rename(oldpath, newpath) {
  return new Promise(function (resolve, reject) {
    fs.rename(oldpath, newpath, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};

var renameFiles = function renameFiles(files, userFn, isTest) {
  var tasks = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var index = _step$value[0];
      var file = _step$value[1];

      var dirname = path.dirname(file);
      var basename = path.basename(file);
      var newName = userFn(basename, index).toString();
      var newPath = path.join(dirname, newName);

      console.log(file, '==>', newPath);

      if (isTest) {
        tasks.push(Promise.resolve());
      } else {
        tasks.push(rename(file, newPath));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Promise.all(tasks);
};

var findFiles = function findFiles(pattern) {
  return new Promise(function (resolve, reject) {
    glob(pattern, function (err, files) {
      if (err) reject(err);
      resolve(files);
    });
  });
};

module.exports = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pattern, lambda, isTest) {
    var userFn, files;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userFn = createUserFunction(lambda);

            if (userFn) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', false);

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return findFiles(pattern);

          case 6:
            files = _context.sent;
            _context.next = 9;
            return renameFiles(files, userFn, isTest);

          case 9:
            console.log(isTest ? 'Tests done!' : 'Rename done!');
            return _context.abrupt('return', true);

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](3);

            console.log('Something wrong happend!');
            console.log('Check your arguments');
            console.log(e.message);
            console.log(e.stack);
            return _context.abrupt('return', false);

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 13]]);
  }));

  function laren(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return laren;
}();