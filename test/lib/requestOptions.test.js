var expect = require('chai').expect,
	Semaphore = require('../../lib/semaphore');

describe('requestOptions()', function() {

	var semaphore = new Semaphore(), options;

	describe('with a missing or invalid API key', function() {

		it('should return null when API key is missing', function() {
			options = semaphore.requestOptions('sms', { number: '09995551212', message: 'This is a test' });
			expect(options).to.be.null;
			expect(semaphore.lastError.message).to.contain('Missing Semaphore API key');
		});

	});

	describe('with invalid parameters', function() {

		before(function() {
			semaphore.set('api key', '1234567890abcdefghij');
		});

		it('should return null when action parameter is missing', function() {
			options = semaphore.requestOptions();
			expect(options).to.be.null;
			expect(semaphore.lastError.message).to.contain('Action parameters is required');
		});

		it('should return null when action parameter is not a string', function() {
			options = semaphore.requestOptions(1);
			expect(options).to.be.null;
			expect(semaphore.lastError.message).to.contain('Action parameter must be a string');
		});

		it('should return null when action parameter is not a valid action', function() {
			options = semaphore.requestOptions('xxx');
			expect(options).to.be.null;
			expect(semaphore.lastError.message).to.contain('Invalid Semaphore API action');
		});

		it('should return null when options parameter is not an object', function() {
			options = semaphore.requestOptions('sms', 'options');
			expect(options).to.be.null;
			expect(semaphore.lastError.message).to.contain('Options parameter must be an object');
		});

	});

	describe('Semaphore actions', function() {

		describe('sms', function() {

			it('should return null when options are missing', function() {
				options = semaphore.requestOptions('sms' );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Mobile number and message are required');
			});

			it('should return null when number param is missing', function() {
				options = semaphore.requestOptions('sms', { message: 'This is a test' } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Mobile number is required');
			});

			it('should return null when number param is invalid', function() {
				options = semaphore.requestOptions('sms', { number: '0999555xxxx', message: 'This is a test' } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Mobile number is not valid');
			});

			it('should return null when message param is missing', function() {
				options = semaphore.requestOptions('sms', { number: '09995551212' } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Message is required');
			});

			it('should return null when message param is not a string', function() {
				options = semaphore.requestOptions('sms', { number: '09995551212', message: {} } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Message must be a string');
			});

			it('should return null when message param is too short', function() {
				options = semaphore.requestOptions('sms', { number: '09995551212', message: 'xx' } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Message is too short. Must be at least 3 characters');
			});

			it('should return null when from params is not a string', function() {
				options = semaphore.requestOptions('sms', { number: '09995551212', message: 'This is a test', from: {} } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('From must be a string');
			});

			it('should return a valid url when number/message are valid', function() {
				options = semaphore.requestOptions('sms', { number: '09995551212', message: 'This is a test' } );
				expect(options.method).to.equal('POST');
				expect(options.url).to.equal('http://api.semaphore.co/api/sms?api=1234567890abcdefghij');
				expect(options.body).to.equal('number=09995551212&message=This%20is%20a%20test');
			});

			it('should return a valid url when number/message/from are valid', function() {
				options = semaphore.requestOptions('sms', { number: '09995551212', message: 'This is a test', from: 'nobody' } );
				expect(options.method).to.equal('POST');
				expect(options.url).to.equal('http://api.semaphore.co/api/sms?api=1234567890abcdefghij');
				expect(options.body).to.equal('number=09995551212&message=This%20is%20a%20test&from=nobody');
			});

			it('should return a valid url when number/message are valid, and from setting', function() {
				semaphore.set('from', 'nobody')
				options = semaphore.requestOptions('sms', { number: '09995551212', message: 'This is a test' } );
				expect(options.method).to.equal('POST');
				expect(options.url).to.equal('http://api.semaphore.co/api/sms?api=1234567890abcdefghij');
				expect(options.body).to.equal('number=09995551212&message=This%20is%20a%20test&from=nobody');
			});

		});

		describe('messages', function() {

			it('should return null when page param is not a number', function() {
				options = semaphore.requestOptions('messages', { page: '1' } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Page must be a number');
			});

			it('should return null when page param is less than 1', function() {
				options = semaphore.requestOptions('messages', { page: 0 } );
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Page must be greater than 0');
			});

			it('should return a valid url when no params are passed', function() {
				options = semaphore.requestOptions('messages');
				expect(options.url).to.equal('http://api.semaphore.co/api/messages?api=1234567890abcdefghij');
			})

			it('should return a valid url without page param when params.page is 1', function() {
				options = semaphore.requestOptions('messages', { page: 1 });
				expect(options.method).to.equal('GET');
				expect(options.url).to.equal('http://api.semaphore.co/api/messages?api=1234567890abcdefghij');
			})

			it('should return a valid url with page param when page param is greater than 1', function() {
				options = semaphore.requestOptions('messages', { page: 2 });
				expect(options.method).to.equal('GET');
				expect(options.url).to.equal('http://api.semaphore.co/api/messages?api=1234567890abcdefghij&page=2');
			})

		});

		describe('period', function() {
			it('should return null when no params are passed', function() {
				options = semaphore.requestOptions('period');
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('"startsAt" and "endsAt" dates are required');
			});

			it('should return null when "startsAt" is not a valid ISO Date', function() {
				options = semaphore.requestOptions('period', { startsAt: 'Invalid Date', endsAt: '2014-08-01' });
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('"startsAt" must be a valid ISO date');
			});

			it('should return null when "endsAt" is not a valid ISO Date', function() {
				options = semaphore.requestOptions('period', { startsAt: '2014-07-01T+08:00', endsAt: 'Invalid Date' });
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('"endsAt" must be a valid ISO date');
			});

			it('should return null when "endsAt" is less than "startsAt"', function() {
				options = semaphore.requestOptions('period', { startsAt: '2014-08-01T+08:00', endsAt: '2014-07-01T+08:00' });
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('"endsAt" date must occur after "startsAt" date');
			});

			it('should return a valid url when "startsAt" and "endsAt" dates are valid', function() {
				options = semaphore.requestOptions('period', { startsAt: '2014-07-01T00:00:00+08:00', endsAt: '2014-07-01T23:59:59+08:00' });
				expect(options.method).to.equal('GET');
				expect(options.url).to.equal('http://api.semaphore.co/api/messages/period?api=1234567890abcdefghij&starts_at=1404144000&ends_at=1404230399');
			});

		});

		describe('network', function() {

			it('should return null when no params are passed', function() {
				options = semaphore.requestOptions('network');
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Network name is required');
			});

			it('should return null when no telco param is passed', function() {
				options = semaphore.requestOptions('network', {});
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Network name is required');
			});

			it('should return null when telco param is not a string', function() {
				options = semaphore.requestOptions('network', { telco: 1 });
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Network name must be a string');
			});

			it('should return null when telco param is not a valid network', function() {
				options = semaphore.requestOptions('network', { telco: 'none' });
				expect(options).to.be.null;
				expect(semaphore.lastError.message).to.contain('Network must be one of the following');
			});

			it('should return a valid url when telco param is a valid network', function() {
				options = semaphore.requestOptions('network', { telco: 'globe' });
				expect(options.method).to.equal('GET');
				expect(options.url).to.equal('http://api.semaphore.co/api/messages/network?api=1234567890abcdefghij&telco=globe');
				options = semaphore.requestOptions('network', { telco: 'smart' });
				expect(options.method).to.equal('GET');
				expect(options.url).to.equal('http://api.semaphore.co/api/messages/network?api=1234567890abcdefghij&telco=smart');
				options = semaphore.requestOptions('network', { telco: 'sun' });
				expect(options.method).to.equal('GET');
				expect(options.url).to.equal('http://api.semaphore.co/api/messages/network?api=1234567890abcdefghij&telco=sun');
			});

		});

		describe('account', function() {

			it('should always return a valid url', function() {
				options = semaphore.requestOptions('account');
				expect(options.method).to.equal('GET');
				expect(options.url).to.equal('http://api.semaphore.co/api/sms/account?api=1234567890abcdefghij');
			});

		});

	});

});
