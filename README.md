# Agentia-Semaphore
Agentia-Semaphore is a Node.js module, which provides an object oriented wrapper for the [Semaphore.co](http://www.semaphore.co/) SMS gateway API. With Semaphore you can send SMS messages to all major mobile networks in the Philippines, including Smart, Globe, and Sun, using the 

## Usage

### Installation

![NPM version](https://badge.fury.io/js/agentia-semaphore.png)  [![Build Status](https://travis-ci.org/AgentiaSystems/agentia-semaphore.svg?branch=master)](https://travis-ci.org/AgentiaSystems/agentia-semaphore)

[![Coverage Status](https://coveralls.io/repos/AgentiaSystems/agentia-semaphore/badge.svg?branch=master)](https://coveralls.io/r/AgentiaSystems/agentia-semaphore)

Install with the Node.js package manager [npm](http://npmjs.org/):

    $ npm install --save agentia-semaphore

### Configuration Options

The Agentia-Semaphore API provides the following configuration options.

`api key` (*Required*) - Configures your Semaphore API Key. Use of Agentia-Semaphore requires a [Semaphore](http://www.semaphore.co/) API key. Using the Agentia-Semaphore without setting `api key` will result in an exception.

`from` (*Optional*, *Default*: 'SEMAPHORE') - Sets the default name/number the message should originate from. You can also set the `from` option for each individual message. 

> *NOTE: According to the [Semaphore.co](http://www.semaphore.co/documentation#sending) documentation, "This feature is not available to everyone." Please consult with [Semaphore](http://www.semaphore.co/) to enable this feature.*


##### Setting the configuration options
Using `semaphore.set(option, value)`, where `option` is a string corresponding to the option being set, and `value` is the desired setting for the option.


    var semaphore = require('agentia-semaphore');    
    semaphore.set('api key', 'your_semaphore_api_key');

##### Setting the API key using the Environment Variable
You can also configure your Semaphore API using the `SEMAPHORE_API_KEY` environment variable. Environment variables can be set directly on your operating system or using [dovenv](https://github.com/bkeepers/dotenv).

    SEMAPHORE_API_KEY=your_semaphore_api_key

> *NOTE: Some Node.js hosting providers require that environment variables are set via either their website or they CLI configuration tool. Consult your hosting provider's documentation for more information.*
>
> Heroku: [Configuration and Config Variables](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application)
> 
> AppFog: [Application Environment](https://docs.appfog.com/getting-started/af-cli#app-env)
>
> OpenShift: [How Create and Use Environment Variables](https://www.openshift.com/kb/kb-e1072-how-to-create-and-use-environment-variables-on-the-server)

### The Agentia-Semaphore API
Our API mirrors all the functions available in the [Semaphore.co](http://www.semaphore.co/documentation) API.

#### Sending Messages

To send messages you use the `semaphore.sms()` api function.

	semaphore.sms(<number>, <message>, [<from>], [<callback>]);
    
The function accepts four parameters:

`number` *(required)* - a string with the destination mobile number.  You can use any of the following formats:

- 10-digit number (e.g. 9995551212)
- 11-digit number, with leading zero (e.g. 09995551212)
- 12-digit number, with Philippine country code (e.g. 639995551212)
- 12-digit number, with a leading plus sign (e.g. +639995551212)

Dashes, spaces and dots are automatically stripped from the number, you can also use something like 0999-555-1212.

`message` *(required)*  - a string with the text message you wish to send. Because of the 160 character SMS limitation, messages longer than 160 charactes will deduct more than 1 credit from your [Semaphore](http://www.semaphore.co/) account.

`from` *(optional)* - the from name/number that will appear on the message. As I explained above, this feature is not available to all users. Please consult with [Semaphore](http://www.semaphore.co/) for more information.

`callback` *(optional)* - a function that will be called after attempting to send the message. This callback will receive two parameters: `error` and `results`. If an error occured while attempting to make the API call, the `error` parameter will contain an `Error` object describing the error. If the API call was successfull, the `results` parameter will contain an object with the status of the API call. Check out the example below.

*Sample code for sending a message*

	semaphore.sms('09270000000', 'Semaphore rocks!', function(error, results) {
		if (error) {
			console.log(error);
		} else {
			console.log(results);
		}
	});
	
*Sample results (status) object*

	{ 
        'status' :     'success', 
		'message' :    'Message Sent', 
		'code' :       '200', 
		'message_id' : 'unique_string_here', 
		'from' :       'SEMAPHORE', 
		'to' :         '639270000000', 
		'body' :       'Semaphore rocks!' 
    }

Other possible status messages in the results objected include the following:

    Status/Error Codes

    Code	Description
    ----    -------------------
    203     Delivered
    200     Sent to Network
    201     Message Queued
    100     Not Authorized
    101     Not Enough Balance
    102     Feature Not Allowed
    103     Invalid Options
    104     Gateway Down

#### Retrieving list of sent messages
To retrieve a list of the messages you've sent using your [Semaphore](http://www.semaphore.co/) account you use the `semaphore.messages()` api function. This api call returns a maximum of 100 messages at a time. To retrieve additional message you must use the `page` parameter.

	semaphore.messages([<page>], <callback>);
	
`page` *(optional)* - a number corresponding to the page number to retrieve. If ommited, it will default to page 1. 
    
`callback` *(required)* - a function that will be called after attempting to send the message. This callback will receive two parameters: `error` and `results`. If an error occured while attempting to make the API call, the `error` parameter will contain an `Error` object describing the error. If the API call was successfull, the `results` parameter will contain an object with a `messages` property that is an array of the returned messages.

*Sample code for retrieving sent messages*

	semaphore.messages(function(error, results) {
		if (error) {
			console.log(error);
		} else {
			console.log(results);
		}
	});
	
*Sample results messages array*
	
    { 
        messages:
        [ 
            { 
                encoded_id: 'unique_string_here',
                message: 'Second Message',
                number: '639170000000',
                status: 'delivered',
                created_at: '2014-07-01T12:05:00+08:00',
                from: null,
                network: 'globe' 
            },
            { 
                encoded_id: 'unique_string_here',
                message: 'First Message',
                number: '639270000000',
                status: 'delivered',
                created_at: '2014-07-01T12:00:00+08:00',
                from: null,
                network: 'smart' 
            }
        }
    }
    
#### Retrieving list of sent messages by network/telco provider
To retrieve a list of the messages you've sent using your [Semaphore](http://www.semaphore.co/) account to a specific network provider you can use the `semaphore.network()` api function. This call takes two paramters: `telco` and `callback`.

	semaphore.network(<telco>, <callback>);

`telco` *(required)* - a string corresponding to the name of the network/telco provider for the messages you wish to retrieve. The `telco` paramater can only be one of the following: `globe`, `smart`, or `sun`. 
    
`callback` *(required)* - a function that will be called after attempting to send the message. This callback will receive two parameters: `error` and `results`. If an error occured while attempting to make the API call, the `error` parameter will contain an `Error` object describing the error. If the API call was successfull, the `results` parameter will contain an object with a `messages` property that is an array of the returned messages. This is identical to the `results` for the `semaphore.messages()` api call.

*Sample code for retrieving sent messages for a specific telco provider*

	semaphore.network('globe', function(error, results) {
		if (error) {
			console.log(error);
		} else {
			console.log(results);
		}
	});
	
#### Retrieving list of sent messages for a specified time period
To retrieve a list of the messages for a specific time period you can use the `semaphore.period()` api function. This call takes three parameters: `start`, `end`, and `callback`.

	semaphore.network(<start>, <end>, <callback>);

`start` *(required)* - an ISO date formatted string indicating the beginning of the time period. (e.g. '2014-08-01T12:00:00+08:00')
    
`end` *(required)* - an ISO date formatted string indicating the end of the time period. 

> NOTE: Both `start` and `end` should include the timezone portion of the ISO date (e.g. +08:00, for the Philippines), regardless of whether a time is or not included. If the timezone parameter is excluded the date/time will be interpreted as UTC (i.e. +00:00). If the time parameter is excluded from `start`/`end` a time of midnight is assumed (i.e. 'T00:00'). 

> For example: '2014-08-01T00:00+08:00' is August 1, 2014 at midnight Manila time. However, '2014-08-01T00:00' (which defaults to UTC) corresponds to August 1, 2014 at 8:00 AM Manila time. 
    
`callback` *(required)* - a function that will be called after attempting to send the message. This callback will receive two parameters: `error` and `results`. If an error occured while attempting to make the API call, the `error` parameter will contain an `Error` object describing the error. If the API call was successfull, the `results` parameter will contain an object with a `messages` property that is an array of the returned messages. This is identical to the `results` for the `semaphore.messages()` api call.

*Sample code for retrieving sent messages for a specific telco provider*

	semaphore.period('2014-07-01T13:00+08:00', '2014-07-01T14:00+08:00 ', function(error, results) {
        if (error) {
            console.log(error);
        } else {
			console.log(results);
		}
	});
	
#### Retrieving your account status
To obtain your [Semaphore](http://www.semaphore.co/) account status you can use the `semaphore.account()` api function. 

	semaphore.account(<callback>);
	
`callback` *(required)* - a function that will be called after attempting to send the message. This callback will receive two parameters: `error` and `results`. If an error occured while attempting to make the API call, the `error` parameter will contain an `Error` object describing the error. If the API call was successfull, the `results` parameter will contain an object with status of your account.

*Sample code for retrieving account status*

    semaphore.account(function(error, results) {
        if (error) {
    		console.log(error);
        } else {
    		console.log(results);
        }
    });
    
*Sample account status object*

    { 
        status: 'success', 
        balance: 490, 
        account_status: 'Allowed' 
    }


### Running Tests

We use The Mocha framework along with the Chai assertion library for your unit tests.

You can run our unit tests by cloning our repositository, install the module dependencies using `npm install`, then running `npm test`.

    git clone https://github.com/AgentiaSystems/agentia-semaphore.git
    npm install
    npm test

You can also use our `gulp` tasks: `test` and `spec`.

    gulp test
    gulp spec (which generates a coverage report)

## Thanks

Special thanks to Christian Besler of [Kickstart Ventures](http://www.kickstart.ph/) for his support during the development of this module.

## License

(The MIT License)

Copyright (c) 2014 Johnny Estilles

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
