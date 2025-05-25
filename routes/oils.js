const express = require('express');
const router = express.Router();

const oilsController = require('../controllers/oils');

router.get('/', oilsController.getAll);

router.get('/:id', oilsController.getSingle);

router.post('/', oilsController.createOil);

router.put('/id', oilsController.updateOil);

router.delete('/.id', oilsController.deleteOil);

module.exports = router;