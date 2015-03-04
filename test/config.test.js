var expect = require('chai').expect,
	Semaphore = require('../../lib/semaphore');

describe('configuration options', function() {

	describe('default configuration', function() {
		var semaphore = new Semaphore();

		describe('Semaphore', function() {
			it('should be an instance of Semaphore', function() {
				expect(semaphore).to.be.an.instanceof(Semaphore);
			});
		});

		describe('"api key" option', function() {
			it('shoud be null', function() {
				expect(semaphore.get('api key')).to.be.null;
			});
		});

		describe('"from" option', function() {
			it('should be "SEMAPHORE"', function() {
				expect(semaphore.get('from')).to.be.null;
			});			
		})

	});

	describe('setting "api key" using SEMAPHORE_API_KEY env variable', function () {
		it('should thrown an error when set to an invalid keyd', function() {
			expect(function() {
				process.env.SEMAPHORE_API_KEY = 'xxx';
				var semaphore = new Semaphore();
			}).to.throw(Error);
		});

		it('should not thrown an error when set to a valid key', function()  {
			expect(function() {
				process.env.SEMAPHORE_API_KEY = '1234567890abcdefghij';
				var semaphore = new Semaphore();
				expect(semaphore.get('api key')).to.equal('1234567890abcdefghij');
			}).to.not.throw(Error);
		});
	});

	describe('"api key" option', function() {
		var semaphore = new Semaphore();

		describe('setting to an invalid key', function() {
			it('should return null and set lastError', function() {
				expect(semaphore.set('api key', 'xxx')).to.be.null;
				expect(semaphore.lastError.message).to.contain('Invalid API key');
			});
		});

		describe('setting to a non-string', function() {
			it('should return null and set lastError', function() {
				expect(semaphore.set('api key', 999)).to.be.null;
				expect(semaphore.lastError.message).to.contain('Invalid API key');
			});
		});

		describe('setting to a valid key', function() {
			it('should return the "api key"', function() {
				expect(semaphore.set('api key', '1234567890abcdefghij')).to.equal('1234567890abcdefghij');
				expect(semaphore.get('api key')).to.equal('1234567890abcdefghij');
			});
		});

	});

	describe('"from" option', function() {
		var semaphore = new Semaphore();

		describe('setting to a non-string', function() {
			it('should return null and set lastError', function() {
				expect(semaphore.set('from', 999)).to.be.null;
				expect(semaphore.lastError.message).to.contain('"from" must be a string');
			});
		});

		describe('setting to a string', function() {
			it('should return the "from" string', function() {
				expect(semaphore.set('from', '09991234567')).to.equal('09991234567');
				expect(semaphore.get('from')).to.equal('09991234567');
			});
		});

	});

	describe('non-existing option', function () {
		var semaphore = new Semaphore();

		it('should return null and set lastError', function () {
			expect(semaphore.set('xxx', 999)).to.be.null;
			expect(semaphore.lastError.message).to.contain('Invalid option');
		});
	});

});
