'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var createUserFunction = require('./eval');

module.exports = function laren(pattern, lambda, isTest) {
  var userFn = createUserFunction(lambda);
  if (!userFn) {
    process.exit(1);
  }

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

  var findFiles = function findFiles() {
    return new Promise(function (resolve, reject) {
      glob(pattern, function (err, files) {
        if (err) reject(err);
        resolve(files);
      });
    });
  };

  _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var files, tasks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, index, file, dirname, basename, newName, newPath;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            files = void 0;
            _context.prev = 1;
            _context.next = 4;
            return findFiles();

          case 4:
            files = _context.sent;
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](1);

            console.log('Invalid path given');
            return _context.abrupt('return');

          case 11:
            tasks = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 15;


            for (_iterator = files.entries()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _step$value = _slicedToArray(_step.value, 2);
              index = _step$value[0];
              file = _step$value[1];
              dirname = path.dirname(file);
              basename = path.basename(file);
              newName = userFn(basename, index).toString();
              newPath = path.join(dirname, newName);

              console.log(file, '==>', newPath);

              if (isTest) {
                tasks.push(Promise.resolve());
              } else {
                tasks.push(rename(file, newPath));
              }
            }

            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context['catch'](15);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError) {
              _context.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
            _context.prev = 31;
            _context.next = 34;
            return Promise.all(tasks);

          case 34:
            console.log(isTest ? 'Tests done!' : 'Rename done!');
            _context.next = 43;
            break;

          case 37:
            _context.prev = 37;
            _context.t2 = _context['catch'](31);

            console.log('Something wrong happend!');
            console.log('Check your syntax');
            console.log(_context.t2.message);
            console.log(_context.t2.stack);

          case 43:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7], [15, 19, 23, 31], [24,, 26, 30], [31, 37]]);
  }))();
};