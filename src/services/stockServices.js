const csv = require("csvtojson");
const config = require("../../config");

const stockServices = {};

stockServices.stockJSON = [];

stockServices.init = function() {
  let csvFilePath;
  for (let i = 0; i < config.CSVFiles.length; i++) {
    csvFilePath = config.CSVFiles[i];
    csv()
      .fromFile(csvFilePath)
      .then(jsonObj => {
        this.stockJSON = this.stockJSON.concat(jsonObj);
        if (i === config.CSVFiles.length - 1) {
          this.stockJSON.sort(this.stockCompare);
        }
      });
  }
};

stockServices.stockMatch = function(
  queryString,
  thisStockName,
  thisStockSymbol
) {
  const matchExp = new RegExp(queryString, "g");
  if (
    thisStockName.match(matchExp) !== null ||
    thisStockSymbol.match(matchExp)
  ) {
    return true;
  } else {
    return false;
  }
};

stockServices.stockCompare = function(a, b) {
  const stockA = a.Name.toUpperCase();
  const stockB = b.Name.toUpperCase();

  let comparison = 0;
  if (stockA > stockB) {
    comparison = 1;
  } else if (stockA < stockB) {
    comparison = -1;
  }
  return comparison;
};

module.exports = stockServices;
return module.exports;
