'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', function(req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === null && initUnit === null) {
      return res.json({ error: 'invalid number and unit' });
    } else if (initNum === null) {
      return res.json({ error: 'invalid number' });
    } else if (initUnit === null) {
      return res.json({ error: 'invalid unit' });
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const resultString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit: initUnit === 'l' ? 'L' : initUnit,
      returnNum,
      returnUnit,
      string: resultString
    });
  });
};
