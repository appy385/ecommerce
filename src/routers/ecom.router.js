const express = require('express');
const {
  createEcomHandler, getDistinctFeaturesHandler,
} = require('../handlers/ecom.handler');

const router = express.Router();

router.put('/', createEcomHandler);
router.get('/:category', getDistinctFeaturesHandler);

module.exports = { router };
