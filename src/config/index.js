let isReal = false;

function getBaseUrl() {
  if (isReal) {
    return "http://77.243.80.157:1001";
  } else {
    return "http://localhost:1001"
  }
}

export default {
  baseURL: getBaseUrl(),
};