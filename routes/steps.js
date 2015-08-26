'use strict';

module.exports = {
  '/': {
    template: 'form/index',
    fields: [
      'name',
      'sex',
      'age',
      'country'
    ],
    backLink: false,
    next: '/done',
  },
  '/done': {
    controller: require('../controllers/form'),
    template: 'form/done',
    backLink: null
  }
};
