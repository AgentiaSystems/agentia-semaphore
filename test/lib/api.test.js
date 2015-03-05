var _ = require('underscore'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	semaphore = require('../../');

chai.use(sinonChai);

describe('.api()', function () {
	var callback = sinon.stub();

	before(function() {
		sinon.stub(semaphore, '__request');
		sinon.spy(semaphore, '__noop');
		sinon.spy(semaphore, 'requestOptions');
		semaphore.set('api key', '1234567890abcdefghij');
	});

	after(function() {
		semaphore.__request.restore();
		semaphore.__noop.restore();
		semaphore.requestOptions.restore();
	});

	beforeEach(function() {
		callback.reset();
		semaphore.__request.reset();
		semaphore.__noop.reset();
		semaphore.requestOptions.reset();
	});

	it('should set error when called without parameters', function() {
		semaphore.api();

		expect(semaphore.__request).to.not.have.been.called;
		expect(semaphore.__noop).to.have.been.called.once;
		expect(semaphore.__noop).to.have.been.calledWithExactly(semaphore.lastError, false);
		expect(semaphore.lastError.message).to.equal('Action parameters is required');
	});

	it('should set error when called without parameters', function() {
		semaphore.api('invalid');

		expect(semaphore.requestOptions).to.have.been.called.once;
		expect(semaphore.requestOptions).to.have.been.calledWithExactly('invalid', undefined);
		expect(semaphore.__request).to.not.have.been.called;
		expect(semaphore.__noop).to.have.been.called.once;
		expect(semaphore.__noop).to.have.been.calledWithExactly(semaphore.lastError, false);
		expect(semaphore.lastError.message).to.equal('Invalid Semaphore API action');
	});

	it('should call .__request() when called with valid action', function() {
		var err = null, 
			res = { data: 'response' },
			body = { data: 'body' };

		semaphore.api('account');
		semaphore.__request.callArgWith(1, err, res, JSON.stringify(body));

		expect(semaphore.requestOptions).to.have.been.called.once;
		expect(semaphore.requestOptions).to.have.been.calledWithExactly('account', undefined);

		expect(semaphore.__request).to.have.been.called.once;
		expect(semaphore.__request.firstCall.args[0]).to.be.an('object');
		expect(semaphore.__request.firstCall.args[0]).to.deep.equal(semaphore.requestOptions.returnValues[0]);
		expect(semaphore.__request.firstCall.args[1]).to.be.a('function');

		expect(semaphore.__noop).to.have.been.called.once;
		expect(semaphore.__noop.firstCall.args[0]).to.be.null;
		expect(semaphore.__noop.firstCall.args[1]).to.be.an('object');
		expect(semaphore.__noop.firstCall.args[1]).to.deep.equal(body);
	});

	it('should call .__request() when called with valid action and callback', function() {
		var err = null, 
			res = { data: 'response' },
			body = { data: 'body' };

		semaphore.api('account', callback);
		semaphore.__request.callArgWith(1, err, res, JSON.stringify(body));

		expect(semaphore.requestOptions).to.have.been.called.once;
		expect(semaphore.requestOptions).to.have.been.calledWithExactly('account', undefined);
		expect(semaphore.__request).to.have.been.called.once;
		expect(semaphore.__request.firstCall.args[0]).to.be.a('object');
		expect(semaphore.__request.firstCall.args[0]).to.deep.equal(semaphore.requestOptions.returnValues[0]);
		expect(semaphore.__request.firstCall.args[1]).to.be.a('function');

		expect(semaphore.__noop).to.not.have.been.called;

		expect(callback).to.have.been.called.once;
		expect(callback.firstCall.args[0]).to.be.null;
		expect(callback.firstCall.args[1]).to.be.an('object');
		expect(callback.firstCall.args[1]).to.deep.equal(body);
	});

	it('should call .__request() with error in callback', function() {
		var err = { message: 'error' }, 
			res = null,
			body = null;

		semaphore.api('account', callback);
		semaphore.__request.callArgWith(1, err, res, JSON.stringify(body));

		expect(semaphore.requestOptions).to.have.been.called.once;
		expect(semaphore.requestOptions).to.have.been.calledWithExactly('account', undefined);
		expect(semaphore.__request).to.have.been.called.once;
		expect(semaphore.__request.firstCall.args[0]).to.be.a('object');
		expect(semaphore.__request.firstCall.args[0]).to.deep.equal(semaphore.requestOptions.returnValues[0]);
		expect(semaphore.__request.firstCall.args[1]).to.be.a('function');

		expect(semaphore.__noop).to.not.have.been.called;

		expect(callback).to.have.been.called.once;
		expect(callback.firstCall.args[0]).to.be.an('object');
		expect(callback.firstCall.args[0]).to.deep.equal(err);
		expect(callback.firstCall.args[1]).to.be.null;
	});

});
