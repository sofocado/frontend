<template>
  <div>
    <!-- <a-date-picker v-model:value="value2" :format="dateFormatList" @click="filter()"/> -->
    <a-page-header title="Reservations"></a-page-header>
    <a-row>
      <a-col :span="15" class="Cards">
        <div v-for="item in dataList" :key="item.name">
          <ReservationCard
            :index="item.index"
            :Username="item.name"
            :reservationStartTime="item.reservationStartTime"
            :table="item.tableType"
            :message="item.message"
            :occasion="item.occasion"
            :reservationCode="item.reservationCode"
          /></div>
        </a-col>
      <a-col :span="9" class="Box">
        <router-view class="content"></router-view>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ReservationApi } from "@/api/reservation";
import ReservationCard from "@/components/ReservationCard.vue";
import dayjs from "dayjs";

export default {
  components: {
    ReservationCard,
  },
  data() {
    return {
      dataList: [],
      dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY']
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
    filter(){
       
    },
    convertSecondsToTime(seconds) {
      if (typeof seconds !== "number" || seconds < 0) {
        return "Invalid input";
      }
      const time = dayjs.unix(seconds);

      return time.format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>

<style scoped>
.Box{
   top: -10vh;
}
</style>