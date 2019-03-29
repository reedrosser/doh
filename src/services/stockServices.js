const csv = require("csvtojson");
const config = require("../../config");
const fs = require("fs");

let csvDir = `${__dirname}/../assets/CSVs/`;

const stockServices = {};

let stockJSON = [];

stockServices.init = function() {
  fs.readdir(csvDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      processCSV(files);
    }
  });
};

stockServices.getStocks = () => {
  return stockJSON;
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

processCSV = files => {
  let csvPromises = [];
  for (file of files) {
    csvPromises.push(csv().fromFile(`${csvDir}${file}`));
  }
  Promise.all(csvPromises)
    .then(results => {
      stockJSON = [].concat.apply([], results).sort(this.stockCompare);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = stockServices;
return module.exports;
