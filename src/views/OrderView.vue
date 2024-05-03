<template>
  <div>
    <a-page-header style="width: 50%" title="Orders"></a-page-header>
    <a-row>
      <a-col :span="13" class="Cards">
        <div v-for="item in dataList" :key="item.name">
          <div>
            <div class="inner3">
              <h2 style="color: black; font-size: 20px; margin-bottom: 0">
                Order # {{ item.orderId }}
              </h2>
              <div>{{ convertSecondsToDate(item.createTime) }}</div>
              <div style="font-size: 16px">
                {{ convertSecondsToTime(item.createTime) }}
              </div>
            </div>
            <button class="button" @click="view(item.orderId, item.createTime)">
              View
            </button>
          </div>
        </div>
      </a-col>
      <a-col :span="8" :offset="1" class="Box">
        <div v-if="order" :key="order">
          <OrderCard
            :orderId="orderId"
            :reservationStartTime="reservationStartTime"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>



<script>
import { OrderApi } from "@/api/order";
import config from "@/config/index.js";
import dayjs from "dayjs";
import OrderCard from "@/components/OrderCard.vue";

export default {
  components: {
    OrderCard,
  },
  data() {
    return {
      baseURL: config.baseURL + "/",
      baseURL2: config.baseURL + "/upload/file",
      dataList: [],
      length2: 0,
      orderId: "",
      order: false,
      reservationStartTime: 0,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const uid = "";
      const rid = localStorage.getItem("rid");
      OrderApi("list", { uid, rid })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    convertSecondsToDate(seconds) {
      if (typeof seconds !== "number" || seconds < 0) {
        return "Invalid input";
      }
      const time = dayjs.unix(seconds);
      return time.format("YYYY-MM-DD");
    },

    convertSecondsToTime(seconds) {
      if (typeof seconds !== "number" || seconds < 0) {
        return "Invalid input";
      }
      const time = dayjs.unix(seconds);
      return time.format("HH:MM");
    },

    async view(orderId, reservationStartTime) {
      this.order = true;
      this.orderId = orderId;
      this.reservationStartTime = reservationStartTime;
    },
  },
};
</script>

<style scoped>
.inner3 {
  width: 100%;
  display: flex;
  padding: 1.5vw;
  gap: 0.5em;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  border: 1px solid rgb(221, 127, 48);
}
.button {
  width: 5em;
  background-color: rgb(221, 127, 48);
  border-radius: 10px;
  border: 1px solid black;
  height: 2em;
  color: white;
  position: relative;
  top: -14vh;
  left: 38vw;
}
.button:hover {
  background-color: black;
  color: white;
}
.Box {
  top: -13vh;
}
</style>