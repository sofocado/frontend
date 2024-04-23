import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import dayjs from "dayjs";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import config from "@/config/index.js";

const pinia = createPinia();
const app = createApp(App);
app.use(router).use(Antd).use(pinia);
app.mount("#app");

app.config.globalProperties.$dateFormat = "DD/MM/YYYY";
app.config.globalProperties.$timeFormat = timeFormat;
app.config.globalProperties.$getHourMinute = getHourMinute;
app.config.globalProperties.$toTimeStamp = toTimeStamp;
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.$getFileName = getFileName;
app.config.globalProperties.$getFileUrl = getFileUrl;

function timeFormat(t, hm) {
  if (!t) {
    return "";
  }
  if (typeof t != "number") {
    return t;
  }
  let d = new Date(t * 1000);
  let day = d.getDate();
  let m = d.getMonth() + 1;
  let y = d.getFullYear();
  if (day.toString().length == 1) {
    day = "0" + day.toString();
  }
  if (m.toString().length == 1) {
    m = "0" + m.toString();
  }
  let h = d.getHours();
  let mn = d.getMinutes();
  if (h.toString().length < 2) {
    h = "0" + h;
  }
  if (mn.toString().length < 2) {
    mn = "0" + mn;
  }
  if (hm) {
    return `${day}/${m}/${y} ${h}:${mn}`;
  }
  return `${day}.${m}.${y}`;
}

function getHourMinute(t, s) {
  if (typeof t != "number") {
    return t;
  }
  if (s) {
    t = t / 1000;
  }
  let d = new Date(t * 1000);
  let h = d.getHours();
  let mn = d.getMinutes();
  if (h.toString().length < 2) {
    h = "0" + h;
  }
  if (mn.toString().length < 2) {
    mn = "0" + mn;
  }
  return `${h}:${mn}`;
}

function toTimeStamp(time) {
  let e = time || 0;
  if (e) {
    return (dayjs(e).valueOf() / 1000).toFixed(0) * 1;
  } else {
    return e;
  }
}

function getFileName(url) {
  if (url && typeof url === "string") {
    if (url.indexOf("/") == -1) {
      return url;
    }
    return url.split("/")[url.split("/").length - 1];
  } else {
    return "";
  }
}

function getFileUrl(url) {
  if (url.indexOf("http") == 0) {
    return url;
  }
  return config.baseURL + url;
}