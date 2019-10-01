/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      assert.isNumber(convertHandler.getNum(input));
      done();
    });
    
    test('Decimal Input', function(done) {
      const input1 = '27.5L';
      assert.equal(convertHandler.getNum(input1),27.5);
      assert.isNumber(convertHandler.getNum(input1));
      const input2 = '27.52kg';
      assert.equal(convertHandler.getNum(input2),27.52);
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '2/3km';
      assert.isNumber(convertHandler.getNum(input));
      assert.closeTo(convertHandler.getNum(input), (2/3), .00001);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '5.4/4L';
      assert.isNumber(convertHandler.getNum(input));
      assert.equal(convertHandler.getNum(input), (5.4 / 4));
      const input2 = '3.7/3kg';
      assert.closeTo(convertHandler.getNum(input2), (3.7 / 3), .00001);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '3/4/5km';
      assert.strictEqual(convertHandler.getNum(input), 'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      const expect = ['gal','L','mi','km','lbs','kg', 'gal','L','mi','km','lbs','kg'];
      input.forEach((ele, i) => {
        const res = convertHandler.getUnit(ele);
        assert.isOk(res);
        assert.equal(res, expect[i]);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      const input = 'rand';
      assert.equal(convertHandler.getUnit(input),'invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const inputs = ['l', 'kg', 'km', 'gal', 'lbs', 'mi', 'L', 'KG', 'KM', 'GAL', 'LBS', 'MI'];
      const expect = ['liters', 'kilograms', 'kilometers', 'gallons', 'pounds', 'miles', 'liters', 'kilograms', 'kilometers', 'gallons', 'pounds', 'miles'];
      inputs.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.001); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'l'];
      var expected = 1.3209;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.001); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.001); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'km'];
      var expected = 3.1069;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.001); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [5, 'lbs'];
      var expected = 2.2680;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.001); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'kg'];
      var expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.001); //0.1 tolerance
      done();
    });
    
  });

});