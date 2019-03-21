const config = require("./config.js");
module.exports = {
  devServer: {
    proxy: "http://localhost:" + (config.port || 3000)
  }
};
