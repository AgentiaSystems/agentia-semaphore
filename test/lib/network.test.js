var _ = require('lodash'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	semaphore = require('../../');

chai.use(sinonChai);

describe('.network()', function () {
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

	it('should call api with telco and callback', function() {
		var telco = 'globe';

		semaphore.network(telco, callback);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('network');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ telco: telco });
		expect(semaphore.api.getCall(0).args[2]).to.equal(callback);
	});

	it('should call api with telco and without callback', function() {
		var telco = 'globe';

		semaphore.network(telco);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('network');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ telco: telco });
		expect(semaphore.api.getCall(0).args[2]).to.equal(undefined);
	});

});
