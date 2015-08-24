'use strict';

var
  fields    = require('./fields'),
  countries = require('./countries'),
  _         = require('underscore');

function createOption(country)
{
  return {
    value: country.alpha3Code,
    label: country.name//,
    //selected: (country.alpha3Code === 'GBR') ? 'selected' : null
  };
}

fields.country.options = _.map(countries, createOption);

module.exports = fields;
