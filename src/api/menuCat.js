import http from "../utils/http";

export function MenuCatApi(url, data, method) {
  let info = {
    url: "menu/category/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
