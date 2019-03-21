const express = require("express");
const app = express();

let stockJSON = { testKey: "testValue" };

app.get("/", (req, res) => res.send(":)"));

app.get("/stocks", (req, res) => {
  if (req.query.stockName === undefined || req.query.stockName.length < 3) {
    res.status(400).json([]);
    return;
  }
  let returnArray = stockJSON.filter(stock => {
    return stockMatch(
      req.query.stockName.toLowerCase(),
      stock.Name.toLowerCase(),
      stock.Symbol.toLowerCase()
    );
  });
  res.json(returnArray);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getInfo() {
  const csvFilePath = "./src/assets/companylist.csv";
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      stockJSON = jsonObj;
    });
}

function stockMatch(queryString, thisStockName, thisStockSymbol) {
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

getInfo();
