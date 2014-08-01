var semaphore = require('../');

semaphore.set('api key', 'your_semaphore_api');

semaphore.network('globe', function(error, results) {
	if (error) {
		console.log(error);
	} else {
		console.log(results);
	}
});
