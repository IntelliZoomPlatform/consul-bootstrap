'use strict';

let _ = require('lodash'),
    async = require('async'),
    argv = require('minimist')(process.argv.slice(2)),
    host = argv.host || '127.0.0.1',
    port = argv.port || '8500',
    inputFile = argv.input,
    flatten = require('./flatten'),
    consul = require('consul')({ host, port });

let debug = (argv.debug)? console.log.bind(console) : function(){};

let assert = (condition, failMessage, err) => {
  if (!condition){
    console.error(`Error: ${failMessage}`);
    if (err) console.error(err.stack);
    process.exit(-1);
  }
};

assert(inputFile, 'Please specify the bootstrap file with the --input flag.');

let object = null;

try {
  object = require(inputFile);
}
catch (e){
  assert(!e, `Could not load input file: ${inputFile}.`, e)
}

assert(_.isObject(object), 'Input is not an object.');

let flattenedObject = flatten(object);

let insertKeyValuePair = (key) => {
  return (next) => {
    let value = flattenedObject[key];
    let serialized = (_.isString(value))? value : JSON.stringify(value, null, 2);
    consul.kv.set(key, serialized, (err, results) => {
      if (err) console.error(`ERROR: setting key ${key}: ${err}`);
      else debug(`DEBUG: Successfully set '${key}' with value: ${value}`);
      return next(err, results);
    });
  };
};

let insertTasks = _.keys(flattenedObject).map(insertKeyValuePair);

console.log(insertTasks.length);

async.parallel(insertTasks, (err) => {
  assert(!err, 'Error inserting key/value pairs', err);
});