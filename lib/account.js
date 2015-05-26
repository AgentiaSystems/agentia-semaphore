'use strict';

/**
 * Shortcut method to API call that checks your account balance and status
 * @method account
 * @param {function} done - callback invoked when API call is complete
 */
var account = function account(done) {
  // make the api call
  this.api('account', done);
};

// export public api function
module.exports = account;
