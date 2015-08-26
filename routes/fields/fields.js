'use strict';

module.exports = {
  'name': {
    validate: ['required'],
    label: 'fields.name.label',
    placeholder: 'John Doe', // Not currently supported by hmpo-template-mixins - add support?
    autofocus: 'autofocus', // Not currently supported by hmpo-template-mixins - add support?
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
    placeholder: '18', // Not currently supported by hmpo-template-mixins - add support?
  },
  'country': {
    validate: ['required'],
    label: 'fields.country.label',
    options: []
  },
  submit: {
    value: 'buttons.submit'
  }
};
