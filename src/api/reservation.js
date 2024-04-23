import http from "../utils/http";

export function ReservationApi(url, data, method) {
  let info = {
    url: "reservation/" + url,
  };
  if (method == "GET") {
    info["method"] = "GET";
  } else {
    info["method"] = "POST";
    info["data"] = data;
  }
  return http(info);
}
