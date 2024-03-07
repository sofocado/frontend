import http from "../utils/http";

export function MenuApi(url, data, method) {
  let info = {
    url: "menu/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
