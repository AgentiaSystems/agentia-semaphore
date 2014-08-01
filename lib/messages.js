// require dependencies
var _ = require('underscore');

/**
 * Shortcut method to API call that gets a list of sent messages
 * @method messages
 * @param {int} page - page number of messages to return, defaults to 1
 * @param {function} done - callback invoked when API call is complete
 */
var messages = function(page, done) {
	var params;

	// check if "page" argument was not passed
	if (_.isFunction(page)) {
		done = page;
		page = undefined;
	}
	// build params object for api call
	if (_.isNumber(page)) {
		params = { page: page };
	}

	// make the api call
	this.api('messages', params, done);
};

// export public api function
module.exports = messages;
