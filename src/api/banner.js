import http from "../utils/http";

export function BannerApi(url, data, method) {
  let info = {
    url: "banner/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
