'use strict';

module.exports = {
  'name': { // Redundant?
    label: 'fields.name.label'
  },
  'sex': {
	legend: 'fields.sex.legend',
    validate: ['required'],
    display: 'block',
    className: 'panel-indent',
    options: [{
      value: 'male',
      label: 'fields.sex.options.male.label'
    }, {
      value: 'female',
      label: 'fields.sex.options.female.label'
    }]
  },
  'age': {
    validate: ['required', 'numeric'],
    label: 'fields.age.label',
    type: 'number',
    min: '0', // Not currently supported by hmpo-template-mixins - add support?
  },
  'country': {
    validate: ['required'],
    label: 'fields.country.label',
    options: [{
      value: 'uk',
      label: 'fields.country.options.uk.label'
    }, {
      value: 'france',
      label: 'fields.country.options.france.label'
    }]
  },
  submit: {
    value: 'buttons.submit'
  },
  /****************************************************************************/
  'continue': {
    value: 'buttons.continue'
  }
};
