var semaphore = new require('../');

semaphore.set('api key', 'your_semaphore_api');

semaphore.messages(function(error, results) {
	if (error) {
		console.log(error);
	} else {
		console.log(results);
	}
});
