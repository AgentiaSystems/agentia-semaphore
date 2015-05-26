'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var semaphore = require('../../');

chai.use(sinonChai);

describe('.account()', function () {
  before(function () {
    sinon.stub(semaphore, 'api');
  });

  after(function() {
    semaphore.api.restore();
  });

  afterEach(function() {
    semaphore.api.reset();
  });

  it('should call .api() with callback ', function() {
    var callback = sinon.stub();
    semaphore.account(callback);
    expect(semaphore.api).to.have.been.called.once;
    expect(semaphore.api).to.have.been.calledWithExactly('account', callback);
  });

  it('should call api without callback', function() {
    semaphore.account();
    expect(semaphore.api).to.have.been.called.once;
    expect(semaphore.api).to.have.been.calledWithExactly('account', undefined);
  });

});
