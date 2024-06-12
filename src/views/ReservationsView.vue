<template>
 <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div style="margin-bottom: 2em">
    <a-page-header style="width: 50%" title="Reservations"></a-page-header>
    <a-range-picker
      v-model:value="time"
      :allowEmpty="[null, null]"
      :allow-clear="true"
      :show-time="{ format: 'HH:mm' }"
      format="DD-MM-YY HH:mm"
      style="margin-bottom: 1em; margin-left: 0.5em"
    />
    <a-button @click="loadData()" style="margin-left: 1em">Search</a-button>

    <a-dropdown class="drop">
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1" @click="loadData"> Upcoming </a-menu-item>
          <a-menu-item key="2" @click="loadData2"> History </a-menu-item>
        </a-menu>
      </template>
      <a-button>
        <img src="../images/filter.png" alt="" class="img" />
      </a-button>
    </a-dropdown>
    <a-row>
      <template v-if="dat">
        <a-col :span="16" class="Cards">
          <div v-for="(item, index) in filteredData" :key="item.name">
            <ReservationCard
              :index="index + 1"
              :Username="item.name"
              :reservationStartTime="item.reservationStartTime"
              :table="item.tableType"
              :message="item.message"
              :orderId="item.orderId"
              :occasion="item.occasion"
              :reservationCode="item.reservationCode"
            />
            <div class="button-container">
              <button
                class="button"
                @click="view(item.orderId, item.reservationStartTime)"
              >
                View
              </button>
              <button class="buttona" @click="deleteRes(item.reservationId)">
                Delete
              </button>
            </div>
          </div>
          <a-pagination
            @change="handlePageChange"
            :current="currentPage"
            :total="totalRecords"
            :pageSize="pageSize"
            showLessItems
          />
        </a-col>
      </template>
      <template v-else>
        <a-col :span="16" class="Cards">
          <div v-for="(item, index) in filteredData2" :key="item.name">
            <ReservationCard
              :index="index + 1"
              :Username="item.name"
              :reservationStartTime="item.reservationStartTime"
              :table="item.tableType"
              :message="item.message"
              :orderId="item.orderId"
              :occasion="item.occasion"
              :reservationCode="item.reservationCode"
            />
            <div class="button-container">
              <button
                class="button"
                @click="view(item.orderId, item.reservationStartTime)"
              >
                View
              </button>
              <button class="buttona" @click="deleteRes(item.reservationId)">
                Delete
              </button>
            </div>
          </div>
          <a-pagination
            @change="handlePageChange1"
            :current="currentPage"
            :total="totalRecords"
            :pageSize="pageSize"
            showLessItems
          />
        </a-col>
      </template>

      <a-col :span="8" class="Box">
        <div v-if="order" :key="order">
          <OrderCard :orderId="orderId" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ReservationApi } from "@/api/reservation";
import ReservationCard from "@/components/ReservationCard.vue";
import OrderCard from "@/components/OrderCard.vue";
import { message } from "ant-design-vue";

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
      reservationStartTime: 0,
      sort: [
        {
          key: "reservationStartTime",
          isAsc: 1,
        },
      ],
      dat: true,
      activeCategory: false,
      currentPage: 1,
      pageSize: 10,
      totalRecords: 0,
      time: [null, null],
      loading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    filteredData() {
      const currentTime = new Date().getTime() / 1000.0;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.dataList
        .filter((item) => item.reservationStartTime >= currentTime)
        .slice(startIndex, endIndex);
    },
    filteredData2() {
      const currentTime = new Date().getTime() / 1000.0;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.dataList
        .filter((item) => item.reservationStartTime <= currentTime)
        .slice(startIndex, endIndex);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    handlePageChange1(page) {
      this.currentPage = page;
      this.loadData2();
    },
    loadData() {
      this.loading = true;
      this.dat = true;
      const uid = "";
      const rid = localStorage.getItem("rid");
      const sort = this.sort;
      let time = [
        {
          key: "reservationStartTime",
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

      ReservationApi("list", { uid, rid, sort, time })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false; // Set loading state to false after API request
        });
    },

    deleteRes(reservationId) {
      ReservationApi("delete", { reservationId }).then((res) => {
        if (res.result_code === 0) {
          message.success("Reservation deleted");
          this.loadData();
        }
      });
    },
    loadData2() {
      this.loading = true;
      this.dat = false;
      const uid = "";
      const rid = localStorage.getItem("rid");
      const sort = this.sort;
      ReservationApi("list", { uid, rid, sort })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
          this.totalRecords = JSON.parse(JSON.stringify(res.data.recordcount));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false; // Set loading state to false after API request
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
.Cards {
  position: relative;
  padding-left: 0.5em;
}
.Box {
  top: -17vh;
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
}
.button:hover {
  background-color: black;
  color: white;
}
.buttona {
  width: 5em;
  background-color: rgb(255, 0, 0);
  border-radius: 10px;
  border: 1px solid black;
  height: 2em;
  color: white;
  position: relative;
}
.buttona:hover {
  background-color: black;
  color: white;
}
.date {
  margin-bottom: 3vh;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: -1em;
  position: relative;
  top: -2em;
  left: -20vw;
  gap: 1em;
}
.button2 {
  height: 5vh;
  margin-left: 0.5vw;
  margin-bottom: 1vw;
  width: 20vw;
  border: 1px solid rgb(221, 127, 48);
  background-color: white;
  border-radius: 20px;
}
.button2:hover {
  background-color: rgb(221, 127, 48);
  color: white;
}
.button2.selected {
  background-color: rgb(221, 127, 48);
  color: white;
}
.selected {
  background-color: blue;
  color: white;
}
.img {
  width: 2em;
  margin-top: -0.5vh;
}
.drop {
  margin-left: 7.5vw;
}
</style>
