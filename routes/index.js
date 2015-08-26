'use strict';

var
  wizard     = require('hmpo-form-wizard'),
  mixins     = require('hmpo-template-mixins'),
  i18n       = require('i18n-future'),
  router     = require('express').Router(),
  formSteps  = require('./steps'),
  fields     = require('./fields'),
  formWizard = wizard(formSteps, fields, { translate: i18n().translate.bind(i18n) });

router.use(i18n.middleware());
router.use(mixins(fields));

router.get ('/',        require('../controllers/index'));
router.use('/form/',    formWizard);
router.get ('/results', require('../controllers/results'));

module.exports = router;
