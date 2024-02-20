import http from "../utils/http";

export function RestaurantApi(url, data, method) {
  let info = {
    url: "/restaurant/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
