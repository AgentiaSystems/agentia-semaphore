var semaphore = require('../');

semaphore.set('api key', 'your_semaphore_api');

semaphore.period('2014-07-01T12:00+08:00', '2014-07-01T14:00+08:00', function(error, results) {
	if (error) {
		console.log(error);
	} else {
		console.log(results);
	}
});
