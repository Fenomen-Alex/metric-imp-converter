function ConvertHandler() {

  this.getNum = function(input) {
    const regex = /([0-9]*\.?[0-9]+(\/[0-9]*\.?[0-9]+)?)/g;
    const result = input.match(regex);

    if (!result || result.length === 0) return 1;  // No number found, default to 1

    if (result.length > 1) return null;  // More than one valid number detected

    const fraction = result[0].split('/');

    if (fraction.length > 2) return null;  // More than one fraction detected

    return fraction.length === 2 ? parseFloat(fraction[0]) / parseFloat(fraction[1]) : parseFloat(fraction[0]);
  };

  this.getUnit = function(input) {
    const units = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const regex = /[a-zA-Z]+/;
    const result = input.match(regex);

    if (!result) return null; // No unit found
    const unit = result[0].toLowerCase(); // Convert to lowercase for matching

    return units.includes(unit) ? unit : null; // Valid unit check
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',  // Gallons return 'L'
      l: 'gal',  // Liters return 'gal'
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return unitNames[unit];
  };

  this.convert = function(initNum, initUnit) {
    const conversions = {
      gal: (num) => num * 3.78541,
      l: (num) => num / 3.78541,
      mi: (num) => num * 1.60934,
      km: (num) => num / 1.60934,
      lbs: (num) => num * 0.453592,
      kg: (num) => num / 0.453592
    };

    return parseFloat(conversions[initUnit](initNum).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const displayReturnUnit = returnUnit === 'L' ? 'L' : returnUnit; // Ensure Liters are displayed as 'L'

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(displayReturnUnit)}`;
  };
}

module.exports = ConvertHandler;
