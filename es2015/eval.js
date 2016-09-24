"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function createUserFunc(code) {
  try {
    var fn = eval(code);
    if (!(typeof fn === "undefined" ? "undefined" : _typeof(fn)) === 'function') {
      console.log("No function given");
      return false;
    }
    return fn;
  } catch (e) {
    console.log("Error in your function! Check syntax");
    console.log(e.message);
    console.log(e.stack);
    return false;
  }
};