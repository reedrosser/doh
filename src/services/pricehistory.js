import axios from "axios";

export function getHistory(value, callback) {
  axios
    .get(
      `https://api.iextrading.com/1.0/stock/${value}/chart/1m?filter=high,low,open,close,date`
    )
    .then(res => {
      callback(res.data);
      return res.data;
    })
    .catch(err => console.log(err));
}
