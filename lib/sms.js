'use strict';

// require dependencies
var _ = require('lodash');

/**
 * Shortcut method to API call that sends an SMS message
 * @method network
 * @param {string} number - destination mobile number
 * @param {string} message - message to send
 * @param {string} from - (optional) sets messags "from" description
 * @param {function} done - callback invoked when API call is complete
 */
function sms(number, message, from, done) {
  var params;

  // check if "from" argument was not passed
  if (_.isFunction(from)) {
    done = from;
    from = undefined;
  }

  // build params object for api call
  params = {
    number: number,
    message: message
  };

  // add "from" option if it was passed and it's a string
  if (_.isString(from)) {
    params.from = from;
  }

  // make the api call
  this.api('sms', params, done);
}

// export public api function
module.exports = sms;
