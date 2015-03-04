 // require dependencies
 var utils = require('./utils');
 /**
 * Semaphore Class constructor
 */
var Semaphore = function() {
	// create a new instance if one doesn't already exist
	if (!(this instanceof Semaphore)) {
		return new Semaphore();
	}

	// check if an API key has already been configured and validate it
	// define initial options
	this._options = {
		'api key': null,
		'from': null
	};

	if (process.env.SEMAPHORE_API_KEY) {
		if (!utils.isValidApiKey(process.env.SEMAPHORE_API_KEY)) {
			throw new Error('Invalid API key passed to SemaphoreJS');
		}
		this._options['api key'] = process.env.SEMAPHORE_API_KEY;
	}

	// define semaphore.co API urls
	this._url = {
		sms: 'http://api.semaphore.co/api/sms',
		messages: 'http://api.semaphore.co/api/messages',
		period: 'http://api.semaphore.co/api/messages/period',
		network: 'http://api.semaphore.co/api/messages/network',
		account: 'http://api.semaphore.co/api/sms/account'
	};

	// define list of possible telco networks
	this._networks = [ 'globe', 'smart', 'sun' ];

	// initialize lastError
	this.lastError = null;

	// storing a copy of request for later use
	this.__request = require('request');

	return this;
};

/* SemaphoreJS core functions */
Semaphore.prototype.set = require('./set');
Semaphore.prototype.get = Semaphore.prototype.set;
Semaphore.prototype.api = require('./api');
Semaphore.prototype.requestOptions = require('./requestOptions');
/* SemaphoreJS shortcut methods */
Semaphore.prototype.sms = require('./sms');
Semaphore.prototype.messages = require('./messages');
Semaphore.prototype.period = require('./period');
Semaphore.prototype.network = require('./network');
Semaphore.prototype.account = require('./account');
// SemaphoreJS private methos
Semaphore.prototype.__noop = function noop() {};

/**
 * SemaphoreJS version
 */
Semaphore.prototype.version = require('../package.json').version;

// export public api function
module.exports = exports = Semaphore;
