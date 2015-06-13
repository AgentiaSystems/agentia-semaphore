'use strict';

var _ = require('lodash');
var querystring = require('querystring');
var utils = require('./utils');
var moment = require('moment-timezone');

/*eslint-disable*/
var validDate = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
/*esling-enable*/

function paramsValid(instance, action, params) {
  if (!instance.get('api key')) {
    instance.lastError = new Error('Missing Semaphore API key');
    return false;
  }

  if (!action) {
    instance.lastError = new Error('Action parameters is required');
    return false;
  }

  if (!_.isString(action)) {
    instance.lastError = new Error('Action parameter must be a string');
    return false;
  }

  if (params && !_.isObject(params)) {
    instance.lastError = new Error('Options parameter must be an object');
    return false;
  }

  return true;
}

function smsOptions(instance, params, options) {
  var body = {}, number;

  if (!params) {
    instance.lastError = new Error('Mobile number and message are required');
    return false;
  }

  if (!params.number) {
    instance.lastError = new Error('Mobile number is required');
    return false;
  }
  number = utils.validateNumber(params.number);
  if (!number) {
    instance.lastError = new Error('Mobile number is not valid');
    return false;
  }
  if (!params.message) {
    instance.lastError = new Error('Message is required');
    return false;
  }
  if (!_.isString(params.message)) {
    instance.lastError = new Error('Message must be a string');
    return false;
  }
  if (params.message.length < 3) {
    instance.lastError = new Error('Message is too short. Must be at least 3 characters');
    return false;
  }
  if (params.from && !_.isString(params.from)) {
    instance.lastError = new Error('From must be a string');
    return false;
  }

  body.number = number;
  body.message = params.message;
  if (params.from || instance.get('from')) {
    body.from = params.from || instance.get('from');
  }

  options.method = 'POST';
  options.body = querystring.stringify(body);

  return true;
}

function messagesOptions(instance, params, query) {
  if (params && params.page && !_.isNumber(params.page)) {
    instance.lastError = new Error('Page must be a number');
    return false;
  }

  if (params && params.page < 1) {
    instance.lastError = new Error('Page must be greater than 0');
    return false;
  }

  if (params && params.page > 1) {
    query.page = params.page;
  }

  return true;
}

function periodOptions(instance, params, query) {
  if (!params || !params.startsAt || !params.endsAt) {
    instance.lastError = new Error('"startsAt" and "endsAt" dates are required');
    return false;
  }

  if (!_.isString(params.startsAt) || !validDate.test(params.startsAt)) {
    instance.lastError = new Error('"startsAt" must be a valid ISO date');
    return false;
  }

  if (!_.isString(params.endsAt) || !validDate.test(params.endsAt)) {
    instance.lastError = new Error('"endsAt" must be a valid ISO date');
    return false;
  }

  query.starts_at = moment.tz(params.startsAt, 'Asia/Manila').unix();
  query.ends_at = moment.tz(params.endsAt, 'Asia/Manila').unix();

  if (query.starts_at > query.ends_at) {
    instance.lastError = new Error('"endsAt" date must occur after "startsAt" date');
    return false;
  }

  return true;
}

function networkOptions(instance, params, query) {
  if (!params || !params.telco) {
    instance.lastError = new Error('Network name is required');
    return false;
  }
  if (!_.isString(params.telco)) {
    instance.lastError = new Error('Network name must be a string');
    return false;
  }
  if (!_.includes(instance._networks, params.telco)) {
    instance.lastError = new Error('Network must be one of the following: ' +
      instance._networks.join(', '));
    return false;
  }

  query.telco = params.telco;
  return true;
}

function requestOptions(action, params) {
  var url = null,
    query = {},
    options = { headers: { 'User-Agent': 'SemaphoreJS ' + this.version }, method: 'GET' };

  if (!paramsValid(this, action, params)) {
    return null;
  }

  query.api = this.get('api key');

  switch (action) {
    case 'sms': {
      if (!smsOptions(this, params, options)) {
        return null;
      }
      url = this._url.sms;
      break;
    }

    case 'messages': {
      if (!messagesOptions(this, params, query)) {
        return null;
      }
      url = this._url.messages;
      break;
    }

    case 'period': {
      if (!periodOptions(this, params, query)) {
        return null;
      }
      url = this._url.period;
      break;
    }

    case 'network': {
      if (!networkOptions(this, params, query)) {
        return null;
      }
      url = this._url.network;
      break;
    }

    case 'account': {
      url = this._url.account;
      break;
    }

    default: {
      this.lastError = new Error('Invalid Semaphore API action');
      return null;
    }
  }

  options.url = url + '?' + querystring.stringify(query);

  return options;
}

module.exports = requestOptions;
