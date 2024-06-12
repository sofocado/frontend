<template>
  <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div>
    <a-page-header style="width: 50%" title="Orders">
      <a-range-picker
        v-model:value="time"
        :allowEmpty="[null, null]"
        :allow-clear="true"
        :show-time="{ format: 'HH:mm' }"
        format="DD-MM-YY HH:mm"
        style="margin-bottom: 1em; margin-left: 0.5em"
      />
      <a-button @click="loadData()" style="margin-left: 1em">Search</a-button>
    </a-page-header>
    <a-row>
      <a-col :span="13" class="Cards">
        <div v-for="item in paginatedData" :key="item.name">
          <div>
            <div class="inner3">
              <h2 style="color: black; font-size: 20px; margin-bottom: 0">
                Order Code: {{ item.orderCode }}
              </h2>
              <div>{{ $timeFormat(item.createTime, 1) }}</div>
              <div style="font-size: 18px; color: rgb(221, 127, 48)">
                {{ $timeFormat(item.createTime, 0) }}
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
    <a-pagination
      v-model:current="currentPage"
      :total="totalItems"
      :page-size="5"
      show-less-items
    />
  </div>
</template>



<script>
import { OrderApi } from "@/api/order";
import config from "@/config/index.js";
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
      totalItems: 0,
      currentPage: 1,
      reservationStartTime: 0,
      loading: false,
      time: [null, null],
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * 5;
      const endIndex = startIndex + 5;
      return this.dataList.slice(startIndex, endIndex);
    },
  },
  methods: {
    async loadData() {
      this.loading = true;
      const uid = "";
      const rid = localStorage.getItem("rid");

      let time = [
        {
          key: "createTime",
          min: 0,
          max: 0,
        },
      ];

      if (this.time) {
        time[0].min = this.time[0]
          ? Math.round(new Date(this.time[0]).getTime() / 1000)
          : 0;
        time[0].max = this.time[1]
          ? Math.round(new Date(this.time[1]).getTime() / 1000)
          : 0;
      }

      OrderApi("list", { uid, rid, time })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
          this.totalItems = JSON.parse(JSON.stringify(res.data.recordcount));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async view(orderId, reservationStartTime) {
      this.order = true;
      this.orderId = orderId;
      this.reservationStartTime = reservationStartTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner3 {
  width: 100%;
  display: flex;
  padding: 1.5vw;
  margin-top: -1em;
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
  top: -3em;
  left: 80%;
}
.button:hover {
  background-color: black;
  color: white;
}
.Box {
  top: -13vh;
}
</style>