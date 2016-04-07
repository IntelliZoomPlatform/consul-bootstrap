'use strict';

let _ = require('lodash'),
    flattenObject;

module.exports = flattenObject = function(object, separator) {
  separator = separator || '/';
  var toReturn = {};
  for (var i in object) {
    if (!object.hasOwnProperty(i)) continue;
    if (_.isObject(object[i])) {
      if (object[i].hasOwnProperty('@preserve')){
        delete object[i]['@preserve'];
        toReturn[i] = object[i];
      }
      else if (_.isArray(object[i])){
        toReturn[i] = object[i];
      }
      else {
        var flatObject = flattenObject(object[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          toReturn[i + separator + x] = flatObject[x];
        }
      }
    } else {
      toReturn[i] = object[i];
    }
  }
  return toReturn;
};