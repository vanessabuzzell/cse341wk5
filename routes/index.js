//const routes = require('express').Router();
//const lesson1Controller = require('../controllers/lesson1');

const express = require('express');
const router = express.Router();

//routes.get('/', lesson1Controller.vanessaRoute);
//routes.get('/joshua', lesson1Controller.joshuaRoute);
//routes.get('/harper', lesson1Controller.harperRoute);

router.use('/oils', require('./oils'))

module.exports = router;