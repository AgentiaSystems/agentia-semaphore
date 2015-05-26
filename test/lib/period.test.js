var _ = require('lodash'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	semaphore = require('../../');

chai.use(sinonChai);

describe('.period()', function () {
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

	it('should call api with periods and callback', function() {
		var from = 'form date/time', to = 'to date/time';

		semaphore.period(from, to, callback);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('period');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ startsAt: from, endsAt: to	});
		expect(semaphore.api.getCall(0).args[2]).to.equal(callback);
	});

	it('should call api with periods and without callback', function() {
		var from = 'form date/time', to = 'to date/time';

		semaphore.period(from, to);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('period');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ startsAt: from, endsAt: to	});
		expect(semaphore.api.getCall(0).args[2]).to.equal(undefined);
	});

});
