'use strict';

let chai = require('chai'),
    expect = chai.expect,
    flatten = require('../flatten');

describe('Object Flattening', () => {
  
  it('should flatten a deeply nested object', () => {

    let flattenedObject = flatten(require('./config.json'));

    expect(flattenedObject).to.deep.eq({
      'foo': 'bar',
      'colors/red': '#ff0000',
      'colors/blue': '#0000ff',
      'colors/green': '#00ff00',
      'services/email/host': 'http://email.svcs.youeye.com'
    });

  });

  it('preserves objects marked "@preserve"', () => {

    let flattenedObject = flatten(require('./config2.json'));

    expect(flattenedObject).to.deep.eq({
      'services/email/host': "http://email.svcs.youeye.com",
      'services/email/backend': {
        "pool": true,
        "host": "smtp.gmail.com",
        "port": 465,
        "secure": true,
        "auth": {
          "user": "user@gmail.com",
          "pass": "pass"
        }
      }
    });

  });

  it('preserves all JavaScript types', () => {

    let flattenedObject = flatten(require('./config3.json'));

    /*
     {
     "integer": 1,
     "decimal": 42.42,
     "boolean": true,
     "string": "string",
     "array": [1,2,"three"],
     "object": {
     "@preseve": true,
     "foo": "bar"
     }
     }
     */

    expect(flattenedObject).to.deep.eq({
      "integer": 1,
      "decimal": 42.42,
      "boolean": true,
      "string": "string",
      "array": [1,2,"three"],
      "object": {
        "foo": "bar"
      }
    });

  });

});