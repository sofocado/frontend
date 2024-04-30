import http from "../utils/http";

export function OrderApi(url, data, method) {
  let info = {
    url: "order/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
