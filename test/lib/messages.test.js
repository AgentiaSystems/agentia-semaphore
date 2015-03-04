var _ = require('underscore'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	semaphore = require('../../');

chai.use(sinonChai);

describe('.messages()', function () {
	var callback = sinon.stub();

	before(function () {
		sinon.stub(semaphore, 'api');
	});

	after(function() {
		semaphore.api.restore();
	})

	afterEach(function() {
		semaphore.api.reset();
	});

	it('should call .api() with callback', function() {
		semaphore.messages(callback);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api).to.have.been.calledWithExactly('messages', undefined, callback);
	});

	it('should call api with page and callback', function() {
		var page = 10;

		semaphore.messages(page, callback);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('messages');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ page: page });
		expect(semaphore.api.getCall(0).args[2]).to.equal(callback);
	});

	it('shoud ignore page if not numeric', function() {
		var page = 'this is not a number';

		semaphore.messages(page, callback);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api).to.have.been.calledWithExactly('messages', undefined, callback);
	});

});
