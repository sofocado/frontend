<template>
  <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div class="welcome">
    <h1 style="font-size: 35px">{{ userInfo.name }},</h1>
    <h2 style="font-size: 20px">Welcome to Admin Page</h2>
    <img src="" alt="" />
  </div>

  <div class="container">
    <h1 style="color: black; font-size: 200%; margin-left: 0.5em">
      Restaurant Profile
    </h1>
    <div class="stat">
      <div class="money-container" @click="ff('day')">
        <p>Today's profits</p>
        <span>{{ totalIncome.daily }} ₸</span>
      </div>
      <div class="money-container" @click="ff('month')">
        <p>In this week</p>
        <span>{{ totalIncome.weekly }} ₸</span>
      </div>
      <div class="money-container" @click="ff('week')">
        <p>In this month</p>
        <span>{{ totalIncome.monthly }} ₸</span>
      </div>
      <div class="money-container" @click="ff('year')">
        <p>In this year</p>
        <span>{{ totalIncome.yearly }} ₸</span>
      </div>
    </div>

    <!-- <div class="chart">
      <IncomeChart :totalIncome="totalIncome"/>
    </div> -->

    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="true"
      class="table"
    >
      <template #bodyCell="{ column, index, record }">
        <template v-if="column.type == 'index'">
          <span>{{ index + 1 }}</span>
        </template>
        <template v-if="column.type == 'amount'">
          <span>{{ record.amount }} ₸</span>
        </template>
        <template v-if="column.key == 'createTime'">
          <div>{{ $timeFormat(record.createTime, 1) }}</div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { TransactionApi } from "@/api/transaction";
import { RestaurantApi } from "@/api/restaurant";
// import IncomeChart from "@/components/IncomeChart.vue";

export default {
  components: {
    // IncomeChart,
  },
  data() {
    return {
      total: 0,
      current: 1,
      pageSize: 15,
      dataList: [],
      columns: [],
      totalIncome: {
        daily: null,
        weekly: null,
        monthly: null,
        yearly: null,
      },
      income: [],
      userInfo: [],
      loading: false,
    };
  },
  created() {
    this.setColumns();
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const rid = localStorage.getItem("rid");
      RestaurantApi("get", { rid })
        .then((res) => {
          if (res.result_code === 0) {
            this.userInfo = JSON.parse(JSON.stringify(res.data));
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false; // Set loading state to false after API request
        });
      const dailyIncome = await this.fetchIncome(rid, "day");
      const weeklyIncome = await this.fetchIncome(rid, "week");
      const monthlyIncome = await this.fetchIncome(rid, "month");
      const yearlyIncome = await this.fetchIncome(rid, "year");

      this.totalIncome = {
        daily: dailyIncome,
        weekly: weeklyIncome,
        monthly: monthlyIncome,
        yearly: yearlyIncome,
      };
    },
    async fetchIncome(rid, timeInterval) {
      try {
        const res = await TransactionApi("list", {
          rid,
          sort: [
            {
              key: "createTime",
              isAsc: 0,
            },
          ],
          timeInterval,
        });

        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
          return res.data.total;
        } else {
          console.error(`Error fetching ${timeInterval} income`);
          return null;
        }
      } catch (error) {
        console.error(`Error fetching ${timeInterval} income`, error);
        return null;
      }
    },
    setColumns() {
      this.columns = [
        {
          title: "#",
          type: "index",
          width: "55px",
          align: "center",
        },
        {
          title: "Amount",
          dataIndex: "amount",
          type: "amount",
        },
        {
          title: "Time",
          dataIndex: "createTime",
          customRender: ({ text }) => {
            return this.$timeFormat(text, 1);
          },
        },
        // {
        //   title: "Action",
        //   key: "Action",
        //   width: 50,
        //   align: "center",
        // },
      ];
    },
    ff(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss">
.welcome {
  background-color: rgb(221, 127, 48);
  width: 83vw;
  height: 9em;
  color: white;
  border-radius: 20px;
  opacity: 80%;
  padding: 2em 3em;
  position: fixed;
  z-index: 10000;
}

.container {
  width: 83vw;
  height: 65vh;
  position: fixed;
  overflow: scroll;
  margin-top: 10em;
  border-radius: 20px;
  padding: 2em;
  background-color: rgba(0, 0, 0, 0.02);
  .stat {
    display: flex;
    gap: 30px;
    margin-left: 5em;
    .money-container {
      background-color: rgba(221, 127, 48, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 20px 20px;
      width: 20%;
      height: 8em;
      border-radius: 30px;
      text-align: center;
      span {
        color: rgb(221, 127, 48);
        font-size: 2em;
      }
    }
  }
}
.chart {
  background-color: white;
  margin: 1em;
  padding: 2em;
  border-radius: 30px;
}
.table {
  margin-top: 7vh;
}
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
</style>
