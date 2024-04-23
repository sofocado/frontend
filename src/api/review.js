import http from "../utils/http";

export function ReviewApi(url, data, method) {
  let info = {
    url: "review/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
