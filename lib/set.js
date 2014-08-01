// require dependencies
var _ = require('underscore'),
	utils = require('./utils');

/**
 * Set SemaphoreJS configuration options
 *
 * @method set
 * @param {string} key - name of option to set (or get)
 * @param {string} value - value to which to set @param key
 * @return @param value or null of an error occurred
 */
 var set = function(key, value) {
	// if only key argument exist, the treat as a get()
	if (arguments.length === 1) {
		return this._options[key];
	}

	switch (key) {
		case 'api key':
			// validate the "api key"
			if (utils.isValidApiKey(value)) {
				// set if valid
				this._options[key] = value;
			} else {
				// return an error if not
				this.lastError = new Error('Invalid API key');
				return null;
			}
		break;

		case 'from':
			// make sure the "from" value is a string
			if (_.isString(value)) {
				// set if it is
				this._options[key] = value;
			} else {
				// return an error if it's not
				this.lastError = new Error('"from" must be a string');
				return null;
			}
		break;

		// return an error when attempting to set an invalid option
		default:
			this.lastError = new Error('Invalid option');
			return null;
	}

	// if successful, return the set value
	return value;
};

// export public api function
module.exports = set;
