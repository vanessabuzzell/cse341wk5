const express = require('express');
const router = express.Router();

const oilsController = require('../controllers/oils');
const validation = require('../middleware/validate');

router.get('/', oilsController.getAll);

router.get('/:id', oilsController.getSingle);

router.post('/', validation.saveOil, oilsController.createOil);

router.put('/id', validation.saveOil, oilsController.updateOil);

router.delete('/.id', oilsController.deleteOil);

module.exports = router;