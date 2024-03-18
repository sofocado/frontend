import http from "../utils/http";

export function UploadApi(url, data, method) {
  let info = {
    url: "file/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
