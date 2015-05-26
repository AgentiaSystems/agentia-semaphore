'use strict';

/**
 * Shortcut method to API call that gets a list of sent messages for a specific
 * time period
 * @method period
 * @param {date} startsAt - start date/time of time period
 * @param {date} endsAt - end date/time of time period
 * @param {function} done - callback invoked when API call is complete
 */
var period = function period(startsAt, endsAt, done) {
  var params;

  // build params object for api call
  params = {
    startsAt: startsAt,
    endsAt: endsAt
  };

  // make the api call
  this.api('period', params, done);
};

// export public api function
module.exports = period;
