/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var helmet = require('helmet');
var ConvertHandler = require('../controllers/convertHandler.js');

helmet.xssFilter()
helmet.noSniff()

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      if(initNum == 'invalid number' && initUnit == 'invalid unit'){
        res.json({result: 'invalid number and unit'})
      }
      if(initNum == 'invalid number'){
        res.json({result: 'invalid number'})
      }
      if(initUnit == 'invalid unit'){
        res.json({result: 'invalid unit'})
      }
      res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit})
    });
    
};
