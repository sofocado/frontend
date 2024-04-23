<template>
  <div class="all">
    <a-page-header title="Reviews"></a-page-header>
     <div class="buttona">{{ pp(avgRate) }} <img src="../images/star2.png" style="width: 1.5em; heigth: auto; margin-top: -3px" alt=""></div>
    <div>
      <a-table :columns="columns" :data-source="dataList" :pagination="true" class="table">
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.type == 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.key == 'createTime'">
            <div>{{ convertSecondsToTime(record.createTime) }}</div>
          </template>
         
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { ReviewApi } from "@/api/review";
import dayjs from "dayjs";

export default {
  data() {
    return {
      avgRate: 0,
      dataList: [],
      columns: [],
      testList: []
    };
  },
  created() {
    this.setColumns();
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
        const rid = localStorage.getItem("rid");
      ReviewApi("list", {rid}).then((res) => {
        if (res.result_code === 0 && res.data.rows.length > 0 ) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows[0].reviews));
          this.avgRate = JSON.parse(JSON.stringify(res.data.rows[0].avgRate.totalRate))
        }
        else{
          console.log("")
        }
      });
    },
    pp(num){
      return num.toFixed(1)
    },
    setColumns() {
      this.columns = [
        {
          title: "#",
          type: "index",
          width: "55px",
          align: "center",
          fixed: "left",
        },
        {
          title: "Rating",
          dataIndex: "rating",
          key: "rating",
        },
        {
          title: "Author",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Comment",
          dataIndex: "comment",
          key: "comment",
        },
        {
          title: "Create Time",
          key: "createTime",
          align: "center",
          dataIndex: "createTime"
        },
       
      ]
    },
      convertSecondsToTime(seconds) {
      if (typeof seconds !== "number" || seconds < 0) {
        return "Invalid input";
      }
      const time = dayjs.unix(seconds);

      return time.format("DD.MM.YY HH:mm");
    },
  },
};
</script>

<style scoped>
.all{
    width: 80em;
    margin-top: 2em;
    padding-top: 2em;
    background-color: white;
    border-radius: 30px;
}
.table{
    border-radius: 20px;

}
.button {
  width: 100px;
  background-color: rgb(221, 127, 48);
  border-radius: 10px;
  color: white;
}
.buttona {
  padding-top: 7px;
  margin-bottom: 1em;
  text-align: center;
  width: 5em;
  height: 2em;
  background-color:  rgb(255, 222, 195);
  border-radius: 10px;
  color: black;
}
.button:hover {
  background-color: black;
  color: white;
}
</style>