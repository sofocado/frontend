let isReal = true;

function getBaseUrl() {
  if (isReal) {
    return "http://77.243.80.157:1001";
  } else {
    return "http://192.168.0.123:1001"
  }
}

export default {
  baseURL: getBaseUrl(),
};