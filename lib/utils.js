var _ = require('lodash');

var utils = {

	isValidApiKey: function isValidApiKey(apiKey) {
		var re = /^([0-9]|[a-z]){20}$/i;

		if (!_.isString(apiKey)) {
			return false;
		}

		return re.test(apiKey);
	},

	validateNumber: function validateNumber(number) {
		var re = /^(\+*63|0){0,1}(9[0-9]{9})$/, results;

		if (!_.isString(number)) {
			return null;
		}

		number = number.replace(/(\-|\.|\s)/g, '');
		results = re.exec(number);

		if (!results) {
			return null;
		}

		return ('0' + results[2]);
	}

};

exports = module.exports = utils;
