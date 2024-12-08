const ConvertHandler = require('../controllers/convertHandler.js');
const chai = require('chai');
const assert = chai.assert;

const convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

    test('convertHandler should correctly read a whole number input', function() {
        assert.equal(convertHandler.getNum('5gal'), 5);
    });

    test('convertHandler should correctly read a decimal number input', function() {
        assert.equal(convertHandler.getNum('5.5gal'), 5.5);
    });

    test('convertHandler should correctly read a fractional input', function() {
        assert.equal(convertHandler.getNum('1/2gal'), 0.5);
    });

    test('convertHandler should correctly read a fractional input with a decimal', function() {
        assert.equal(convertHandler.getNum('2.5/2gal'), 1.25);
    });

    test('convertHandler should correctly return an error on a double-fraction', function() {
        assert.equal(convertHandler.getNum('3/2/3gal'), null);
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
        assert.equal(convertHandler.getNum('gal'), 1);
    });

    test('convertHandler should correctly read each valid input unit', function() {
        assert.equal(convertHandler.getUnit('5gal'), 'gal');
    });

    test('convertHandler should correctly return an error for an invalid input unit', function() {
        assert.equal(convertHandler.getUnit('5xyz'), null);
    });

    test('convertHandler should return the correct return unit for each valid input unit', function() {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    });

    test('convertHandler should correctly convert gal to L', function() {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    });

    test('convertHandler should correctly convert L to gal', function() {
        assert.equal(convertHandler.convert(3.78541, 'l'), 1);
    });

    test('convertHandler should correctly convert mi to km', function() {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    });

    test('convertHandler should correctly convert km to mi', function() {
        assert.equal(convertHandler.convert(1.60934, 'km'), 1);
    });

    test('convertHandler should correctly convert lbs to kg', function() {
        assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
    });

    test('convertHandler should correctly convert kg to lbs', function() {
        assert.equal(convertHandler.convert(0.453592, 'kg'), 1);
    });
});
