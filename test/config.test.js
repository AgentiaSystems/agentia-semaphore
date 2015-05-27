'use strict';

var expect = require('chai').expect;
var Semaphore = require('../lib/semaphore');

describe('configuration options', function() {

  describe('default configuration', function() {

    before(function() {
      this.semaphore = new Semaphore();
    });

    after(function() {
      this.semaphore = null;
    });

    describe('Semaphore', function() {
      it('should be an instance of Semaphore', function() {
        expect(this.semaphore).to.be.an.instanceof(Semaphore);
      });
    });

    describe('"api key" option', function() {
      it('shoud be null', function() {
        expect(this.semaphore.get('api key')).to.be.null;
      });
    });

    describe('"from" option', function() {
      it('should be "SEMAPHORE"', function() {
        expect(this.semaphore.get('from')).to.be.null;
      });
    });

  });

  describe('setting "api key" using SEMAPHORE_API_KEY', function () {
    it('should thrown an error when set to an invalid keyd', function() {
      expect(function() {
        process.env.SEMAPHORE_API_KEY = 'xxx';
        this.semaphore = new Semaphore();
      }.bind(this)).to.throw(Error);
    });

    it('should not thrown an error when set to a valid key', function() {
      expect(function() {
        process.env.SEMAPHORE_API_KEY = '1234567890abcdefghij';
        this.semaphore = new Semaphore();
        expect(this.semaphore.get('api key')).to.equal('1234567890abcdefghij');
      }.bind(this)).to.not.throw(Error);
    });
  });

  describe('"api key" option', function() {

    before(function() {
      this.semaphore = new Semaphore();
    });

    after(function() {
      this.semaphore = null;
    });

    describe('setting to an invalid key', function() {
      it('should return null and set lastError', function() {
        expect(this.semaphore.set('api key', 'xxx')).to.be.null;
        expect(this.semaphore.lastError.message).to.contain('Invalid API key');
      });
    });

    describe('setting to a non-string', function() {
      it('should return null and set lastError', function() {
        expect(this.semaphore.set('api key', 999)).to.be.null;
        expect(this.semaphore.lastError.message).to.contain('Invalid API key');
      });
    });

    describe('setting to a valid key', function() {
      it('should return the "api key"', function() {
        expect(this.semaphore.set('api key', '1234567890abcdefghij'))
          .to.equal('1234567890abcdefghij');
        expect(this.semaphore.get('api key')).to.equal('1234567890abcdefghij');
      });
    });

  });

  describe('"from" option', function() {

    before(function() {
      this.semaphore = new Semaphore();
    });

    after(function() {
      this.semaphore = null;
    });

    describe('setting to a non-string', function() {
      it('should return null and set lastError', function() {
        expect(this.semaphore.set('from', 999)).to.be.null;
        expect(this.semaphore.lastError.message)
          .to.contain('"from" must be a string');
      });
    });

    describe('setting to a string', function() {
      it('should return the "from" string', function() {
        expect(this.semaphore.set('from', '09991234567'))
          .to.equal('09991234567');
        expect(this.semaphore.get('from')).to.equal('09991234567');
      });
    });

  });

  describe('non-existing option', function () {

    before(function() {
      this.semaphore = new Semaphore();
    });

    after(function() {
      this.semaphore = null;
    });

    it('should return null and set lastError', function () {
      expect(this.semaphore.set('xxx', 999)).to.be.null;
      expect(this.semaphore.lastError.message).to.contain('Invalid option');
    });
  });

});
