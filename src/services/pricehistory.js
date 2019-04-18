import axios from "axios";

export function getHistory(value) {
  const val = value.replace(/\^/g, "-");
  return axios.get(
    `https://api.iextrading.com/1.0/stock/${val}/chart/1m?filter=high,low,open,close,date`
  );
}
