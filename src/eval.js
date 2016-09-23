module.exports = function createUserFunc(code) {
  try {
    return eval(code);
  } catch(e) {
    console.log("Error in your function! Check syntax");
    console.log(e.message);
    console.log(e.stack);
    return false;
  }
}