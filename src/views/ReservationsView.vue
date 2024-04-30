<template>
  <div>
    <!-- <a-date-picker v-model:value="value2" :format="dateFormatList" @click="filter()"/> -->
    <a-page-header title="Reservations"></a-page-header>
    <a-row>
      <a-col :span="16" class="Cards">
        <div v-for="(item, index) in dataList" :key="item.name">
          <ReservationCard
            :index="index"
            :Username="item.name"
            :reservationStartTime="item.reservationStartTime"
            :table="item.tableType"
            :message="item.message"
            :orderId="item.orderId"
            :occasion="item.occasion"
            :reservationCode="item.reservationCode"
          />
          <button class="button" @click="view(item.orderId, item.reservationStartTime)">View</button>
        </div>
      </a-col>
      <a-col :span="8" class="Box">
        <div v-if="order" :key="order">
          <OrderCard :orderId="orderId" :reservationStartTime="reservationStartTime"  />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ReservationApi } from "@/api/reservation";
import ReservationCard from "@/components/ReservationCard.vue";
import OrderCard from "@/components/OrderCard.vue";

export default {
  components: {
    ReservationCard,
    OrderCard,
  },
  data() {
    return {
      dataList: [],
      orderId: "",
      order: false,
      reservationStartTime: 0
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const uid = "";
      const rid = localStorage.getItem("rid");
      ReservationApi("list", { uid, rid })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    view(orderId, reservationStartTime) {
          this.order = true;
          this.orderId = orderId;
          this.reservationStartTime = reservationStartTime   
    },
  },
};
</script>

<style scoped>
.Box {
  top: -10vh;
  right: 7.5em;
}
.button {
  width: 5em;
  background-color: rgb(221, 127, 48);
  border-radius: 10px;
  border: 1px solid black;
  height: 2em;
  color: white;
  position: relative;
  top: -28vh;
  left: 32vw;
}
.button:hover {
  background-color: black;
  color: white;
}
</style>