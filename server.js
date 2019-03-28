const express = require("express");
const app = express();
const config = require("./config");
const stockServices = require("./src/services/stockServices");

app.get("/", (req, res) => res.send(":)"));

app.get("/stocks", (req, res) => {
  if (req.query.stockName === undefined || req.query.stockName.length < 3) {
    res.status(400).json([]);
    return;
  }
  let returnArray = stockServices.stockJSON.filter(stock => {
    return stockServices.stockMatch(
      req.query.stockName.toLowerCase(),
      stock.Name.toLowerCase(),
      stock.Symbol.toLowerCase()
    );
  });
  res.json(returnArray);
});

app.get("/allstocks", (req, res) => {
  res.json(stockServices.stockJSON);
});

const port = process.env.PORT || config.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!`));

stockServices.init();
