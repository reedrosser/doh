const csv = require("csvtojson");
const config = require("../../config");

const stockServices = {};

stockServices.stockJSON = [];

stockServices.init = function() {
  let csvFilePath;
  let csvPromises = [];
  for (let i = 0; i < config.CSVFiles.length; i++) {
    csvFilePath = config.CSVFiles[i];
    csvPromises.push(csv().fromFile(csvFilePath));
  }
  Promise.all(csvPromises)
    .then(results => {
      this.stockJSON = [].concat.apply([], results).sort(this.stockCompare);
    })
    .catch(err => {
      console.log(err);
    });
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
  }
  return false;
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
