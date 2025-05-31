const validator = require('../helpers/validate');

const saveOil = (req, res, next) => {
  const validationRule = {
    Name: 'required|string',
    Brand: 'required|string',
    Description: 'required|string',
    Directions: 'required|string',
    Made: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveOil
};