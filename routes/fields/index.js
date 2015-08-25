'use strict';

var
  fields    = require('./fields'),
  countries = [],
  _         = require('underscore');

function createOption(country)
{
  return {
    value: country.alpha3Code,
    label: country.name//, FIXME
    //selected: (country.alpha3Code === 'GBR') ? 'selected' : null
  };
}

try
{
  countries = require('./countries');
}
catch(err)
{
  // If we can't find valid JSON then use an empty list.
  countries = [];
  console.log('Warning: Could not find valid countries JSON data.');
}

fields.country.options = _.map(countries, createOption);

module.exports = fields;
