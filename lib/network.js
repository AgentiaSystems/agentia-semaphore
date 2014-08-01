/**
 * Shortcut method to API call that gets a list of sent messages for a specific telco
 * @method network
 * @param {string} telco - name of telco (must be  'globe', 'smart' or 'sun')
 * @param {function} done - callback invoked when API call is complete
 */
var network = function(telco, done) {
	var params;

	// build params object for api call
	params = { telco: telco };

	// make the api call
	this.api('network', params, done);
};

// export public api function
module.exports = network;
