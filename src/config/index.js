// const config = {
//   baseURL: getBaseUrl(),
// };

// function getBaseUrl() {
//   return "http://localhost:2002";
// }

// export default config;

let isReal = false;

function getBaseUrl() {
  if (isReal) {
    return "http://77.243.80.157:1001";
  } else {
    return "http://localhost:2002"
  }
}

export default {
  baseURL: getBaseUrl(),
};