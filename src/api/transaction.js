import http from "../utils/http";

export function TransactionApi(url, data, method) {
  let info = {
    url: "transaction/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
