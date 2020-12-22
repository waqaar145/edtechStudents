const { check, validationResult } = require('express-validator');

module.exports.slugValidation = [
  check('subject_slug').isAlpha().withMessage('Subject slug is required'),
]
