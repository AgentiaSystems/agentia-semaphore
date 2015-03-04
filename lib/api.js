// require dependencies
var _ = require('underscore'),
	request = require('request');

/**
 * Sends an API call to Semaphore.co
 * @method api
 * @param {string} action - name of API function to call
 * @param {object} params - object with required parametrs for the API call
 * @param {function} done - callback invoked when API call is complete
 */
function api(action, params, done) {
	var options;

	// check of params argument was not passed
	if (_.isFunction(params)) {
		done = params;
		params = undefined;
	}

	// if no done callback is passed, default to a dummy/noop function
	if (!_.isFunction(done)) {
		done = this.__noop;
	}

	// build an options object for the request call
	options = this.requestOptions(action, params);

	// if requestOptions returned a null something bad happened
	if (_.isNull(options)) {
		return done(this.lastError, false);
	}

	// call the semaphore.co API
	request(options, function(error, response, body) {
		// if something went wrong, return an error to the callback
		if (error) {
			return done(error, null);
		}

		// return results as a JSON object
		return done(null, JSON.parse(body));
	});

}

// export public api function
module.exports = api;
