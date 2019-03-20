const express = require("express");
const app = express();

let stockJSON = { testKey: "testValue" };

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/stocks", (req, res) => {
  if (req.query.stockName === undefined || req.query.stockName.length < 3) {
    res.status(400).json([]);
    return;
  }
  let returnArray = stockJSON.filter(stock => {
    return stockMatch(
      req.query.stockName.toLowerCase(),
      stock.Name.toLowerCase()
    );
  });
  console.log("returnArray:");
  console.log(returnArray);
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

function stockMatch(queryString, thisStockName) {
  const matchExp = new RegExp(queryString, "g");
  if (thisStockName.match(matchExp) !== null) {
    return true;
  } else {
    return false;
  }
}

getInfo();
