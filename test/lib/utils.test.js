var expect = require('chai').expect,
  utils =  require('../../lib/utils');

describe('utility methods', function() {

	describe('isValidAPI()', function() {

		it('should consider abcde1234567890FGHIJ a valid API key', function() {
			expect(utils.isValidApiKey('abcde1234567890FGHIJ')).to.be.true;
		});

		it('should consider keys shorter than 20 characters as invalid', function() {
			expect(utils.isValidApiKey('1234567890123456789')).to.be.false;
		});

		it('should consider keys longer than 20 characters as invalid', function() {
			expect(utils.isValidApiKey('123456789012345678901')).to.be.false;
		});

		it('should consider keys with special non-alphanumeric characters as invalid', function() {
			expect(utils.isValidApiKey('abcde1234567890FGHI!')).to.be.false;
		});

	});

	describe('validateNumber()', function() {

		describe('valid mobile phone numbers without space, dash or dot separators', function() {
			it('should return normalized number for 10 digit mobile', function() {
				expect(utils.validateNumber('9995551212')).to.equal('09995551212');
			});

			it('should return normalized number for 11 digit mobile (with 0 prefix)', function() {
				expect(utils.validateNumber('09995551212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with 63 prefix)', function() {
				expect(utils.validateNumber('639995551212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with +63 prefix)', function() {
				expect(utils.validateNumber('+639995551212')).to.equal('09995551212');
			});
		});

		describe('valid mobile phone numbers using dash separators', function() {
			it('should return normalized number for 10 digit mobile', function() {
				expect(utils.validateNumber('999-555-1212')).to.equal('09995551212');
			});

			it('should return normalized number for 11 digit mobile (with 0 prefix)', function() {
				expect(utils.validateNumber('0999-555-1212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with 63 prefix)', function() {
				expect(utils.validateNumber('63-999-555-1212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with +63 prefix)', function() {
				expect(utils.validateNumber('+63-999-555-1212')).to.equal('09995551212');
			});
		});

		describe('valid mobile phone numbers using dot separators', function() {
			it('should return normalized number for 10 digit mobile', function() {
				expect(utils.validateNumber('999.555.1212')).to.equal('09995551212');
			});

			it('should return normalized number for 11 digit mobile (with 0 prefix)', function() {
				expect(utils.validateNumber('0999.555.1212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with 63 prefix)', function() {
				expect(utils.validateNumber('63.999.555.1212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with +63 prefix)', function() {
				expect(utils.validateNumber('+63.999.555.1212')).to.equal('09995551212');
			});
		});

		describe('valid mobile phone numbers using space separators', function() {
			it('should return normalized number for 10 digit mobile', function() {
				expect(utils.validateNumber('999 555 1212')).to.equal('09995551212');
			});

			it('should return normalized number for 11 digit mobile (with 0 prefix)', function() {
				expect(utils.validateNumber('0999 555 1212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with 63 prefix)', function() {
				expect(utils.validateNumber('63 999 555 1212')).to.equal('09995551212');
			});

			it('should return normalized number for 12 digit mobile (with +63 prefix)', function() {
				expect(utils.validateNumber('+63 999 555 1212')).to.equal('09995551212');
			});
		});

		describe('valid land lines', function() {
			it('should return null', function() {
				expect(utils.validateNumber('25551212')).to.be.null;
				expect(utils.validateNumber('025551212')).to.be.null;
				expect(utils.validateNumber('+6325551212')).to.be.null;
			});
		});

		describe('numbers with country codes other than +63', function() {
			it('should return null', function() {
				expect(utils.validateNumber('+18005551212')).to.be.null;
				expect(utils.validateNumber('+629995551212')).to.be.null;
				expect(utils.validateNumber('+649995551212')).to.be.null;
			});
		});

		describe('non-string parameters', function() {
			it('should return null', function() {
				expect(utils.validateNumber(9995551212)).to.be.null;
				expect(utils.validateNumber({ number: '09995551212' })).to.be.null;
			});
		});
	});

});

