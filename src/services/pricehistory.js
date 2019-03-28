import axios from "axios";

export function getHistory(value, callback) {
  const val = value.replace(/\^/g, "-");
  axios
    .get(
      `https://api.iextrading.com/1.0/stock/${val}/chart/1m?filter=high,low,open,close,date`
    )
    .then(res => {
      callback(res.data);
      return res.data;
    })
    .catch(err => console.log(err));
}
