import http from "../utils/http";

export function CategoryApi(url, data, method) {
  let info = {
    url: "category/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
