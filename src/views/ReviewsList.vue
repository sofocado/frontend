<template>
 <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div class="all">
    <a-page-header title="Reviews"></a-page-header>
     <div class="buttona">{{ pp(avgRate) }} <img src="../images/star2.png" style="width: 1.5em; heigth: auto; margin-top: -3px;" alt=""></div>
    <div>
      <a-table :columns="columns" :data-source="dataList" :pagination="true" class="table">
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.type == 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.key == 'createTime'">
            <div>{{ $timeFormat(record.createTime, 1) }}</div>
          </template>
         
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { ReviewApi } from "@/api/review";

export default {
  data() {
    return {
      avgRate: 0,
      dataList: [],
      columns: [],
      testList: [],
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
    loadData() {
       this.loading = true;
        const rid = localStorage.getItem("rid");
      ReviewApi("list", {rid})
      .then((res) => {
        if (res.result_code === 0 && res.data.rows.length > 0 ) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows[0].reviews));
          this.avgRate = JSON.parse(JSON.stringify(res.data.rows[0].avgRate.totalRate))
        }
        else{
          console.log("")
        }
      })
       .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false; 
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
  },
};
</script>

<style scoped>
.all{
    width: 95%;
    margin-top: 2em;
    padding-top: 2em;
    background-color: white;
    border-radius: 30px;
}
.table{
    border-radius: 20px;
    width: 100%;
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
  margin-left: 1.5em;
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