var semaphore = require('../');

semaphore.set('api key', 'your_semaphore_api');

semaphore.sms('09995551212', 'Semaphore is great!', function(error, results) {
	if (error) {
		console.log(error);
	} else {
		console.log(results);
	}
});

semaphore.sms('09995551212', 'Semaphore is awesome!', 'Custom From', function(error, results) {
	if (error) {
		console.log(error);
	} else {
		console.log(results);
	}
});
