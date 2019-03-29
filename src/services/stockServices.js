const d3 = require("d3");
const fs = require("fs");

const stockServices = {};

stockServices.stockJSON = [];

stockServices.init = () => {
  let files = fs.readdirSync(`${__dirname}/../assets/CSVs`);
  files.map(file => {
    process(file);
  });
  stockServices.stockJSON = stockServices.stockJSON.sort(this.stockCompare);
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

const process = name => {
  var raw = fs.readFileSync(`${__dirname}/../assets/CSVs/${name}`, "utf8");
  stockServices.stockJSON = stockServices.stockJSON.concat(d3.csvParse(raw));
};

module.exports = stockServices;
return module.exports;
