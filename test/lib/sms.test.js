var _ = require('lodash'),
	chai = require('chai'),
	expect = chai.expect,
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	semaphore = require('../../');

chai.use(sinonChai);

describe('.sms()', function () {
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

	it('should call api with number, message and callback', function() {
		var number = '1234567890', message = 'this is a test';

		semaphore.sms(number, message, callback);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('sms');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ number: number, message: message	});
		expect(semaphore.api.getCall(0).args[2]).to.equal(callback);
	});

	it('should call api with number and message, but no callback', function() {
		var number = '1234567890', message = 'this is a test';

		semaphore.sms(number, message);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('sms');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ number: number, message: message	});
		expect(semaphore.api.getCall(0).args[2]).to.equal(undefined);
	});

	it('should call api with number, message, from and callback', function() {
		var number = '1234567890', message = 'this is a test', from = 'origin';

		semaphore.sms(number, message, from, callback);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('sms');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ number: number, message: message, from: from	});
		expect(semaphore.api.getCall(0).args[2]).to.equal(callback);
	});

	it('should call api with number, message and from, but no callback', function() {
		var number = '1234567890', message = 'this is a test', from = 'origin';

		semaphore.sms(number, message, from);
		expect(semaphore.api).to.have.been.called.once;
		expect(semaphore.api.getCall(0).args[0]).to.equal('sms');
		expect(semaphore.api.getCall(0).args[1]).to.deep.equal({ number: number, message: message, from: from	});
		expect(semaphore.api.getCall(0).args[2]).to.equal(undefined);
	});

});
