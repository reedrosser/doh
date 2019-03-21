const express = require("express");
const app = express();
const config = require("./config");

// Where all the stockJSON gets stored
let stockJSON = [];

app.get("/", (req, res) => res.send(":)"));

// Get particular stocks based off a query parameter
app.get("/stocks", (req, res) => {
  // If there is no query or it's not long enough, return an empty array
  if (req.query.stockName === undefined || req.query.stockName.length < 3) {
    res.status(400).json([]);
    return;
  }
  // If there's an appropriate query, return all the stock JSON that matches the query parameter
  let returnArray = stockJSON.filter(stock => {
    return stockMatch(
      req.query.stockName.toLowerCase(),
      stock.Name.toLowerCase(),
      stock.Symbol.toLowerCase()
    );
  });
  res.json(returnArray);
});

// If you need ALL the stocks
app.get("/allstocks", (req, res) => {
  res.json(stockJSON);
});

const port = process.env.PORT || config.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!`));

// Convert the CSVs into JSON for parsing
function getInfo() {
  const csv = require("csvtojson");

  let csvFilePath = "";
  for (let i = 0; i < config.CSVFiles.length; i++) {
    csvFilePath = config.CSVFiles[i];
    csv()
      .fromFile(csvFilePath)
      .then(jsonObj => {
        stockJSON = stockJSON.concat(jsonObj);
        if (i === config.CSVFiles.length - 1) {
          stockJSON.sort(stockCompare);
        }
      });
  }
}

// See if a queryString exists inside of the stock name or stock symbol
function stockMatch(queryString, thisStockName, thisStockSymbol) {
  // This creates a regular expression variable out of the query string
  const matchExp = new RegExp(queryString, "g");
  if (
    thisStockName.match(matchExp) !== null ||
    thisStockSymbol.match(matchExp)
  ) {
    return true;
  } else {
    return false;
  }
}

// Compare function to sort the stockJSON
function stockCompare(a, b) {
  const stockA = a.Name.toUpperCase();
  const stockB = b.Name.toUpperCase();

  let comparison = 0;
  if (stockA > stockB) {
    comparison = 1;
  } else if (stockA < stockB) {
    comparison = -1;
  }
  return comparison;
}

getInfo();
