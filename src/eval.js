// @flow

module.exports = function createUserFunc(code: string): UserFn {
  try {
    const fn = eval(code); // eslint-disable-line no-eval
    if (!(typeof fn === 'function')) {
      throw new Error('No function given');
    }
    return fn;
  } catch (e) {
    console.error('Error in your function! Check syntax');
    console.error(e.message);
    console.error(e.stack);
    throw e;
  }
};
