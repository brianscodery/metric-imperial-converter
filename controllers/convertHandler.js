/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  this.units = {
    short: ['L', 'kg', 'km', 'gal', 'lbs', 'mi', 'l', 'KG', 'KM', 'GAL', 'LBS', 'MI'],
    long: ['liters', 'kilograms', 'kilometers', 'gallons', 'pounds', 'miles'],
  };
 
  
  this.getNum = function(input) {
    const index = input.search(/[a-zA-Z]/);
    if(index === 0){ return 1;}
    const numberString = input.slice(0,index);
    const divisionIndex = numberString.indexOf('/');
    if (divisionIndex === -1){ return +numberString;}
    const lastDivisionIndex = numberString.lastIndexOf('/');
    if(divisionIndex !== lastDivisionIndex){ return 'invalid number'; }
    const numer = numberString.slice(0, divisionIndex);
    const denom = numberString.slice(divisionIndex + 1);
    return numer / denom;
  };
  
  this.getUnit = function(input) {
    const stringIndex = input.search(/[a-zA-Z]/);
    const inputUnit = stringIndex === 0 ? input : input.slice(stringIndex);
    const unitsIndex = this.units.short.indexOf(inputUnit);
    if (unitsIndex === -1) {
      return 'invalid unit';
    }
    return this.units.short[unitsIndex % 6];
  };
  
  this.getReturnUnit = function(initUnit) {
    const index = this.units.short.indexOf(initUnit);
    // if (index === -1){ return 'invalid unit';}
    return this.units.short[(index + 3) % 6];
  };

  this.spellOutUnit = function(unit) {
    const index = this.units.short.indexOf(unit);
    // if (index === -1){ return 'invalid unit';}
    return this.units.long[index % 6];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let returnVal;
    switch (initUnit) {
      case 'gal':
        return initNum * galToL;
      case 'L':
      case 'l':
        return initNum / galToL;
      case 'lbs':
        return initNum * lbsToKg;
      case 'kg':
        return initNum / lbsToKg;
      case 'mi':
        return initNum * miToKm;
      case 'km':
        return initNum / miToKm;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
