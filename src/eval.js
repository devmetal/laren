module.exports = function createUserFunc(code) {
  try {
    const fn = eval(code);
    if (!typeof fn === 'function') {
      console.log("No function given");
      return false;
    }
    return fn;
  } catch(e) {
    console.log("Error in your function! Check syntax");
    console.log(e.message);
    console.log(e.stack);
    return false;
  }
}