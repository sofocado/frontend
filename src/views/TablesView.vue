<template>
  <div>
    <a-page-header title="Tables"></a-page-header>
    <div style="display: flex; fles-direction: row">
      <div class="card">
        <h2>You have:</h2>
         <div v-for="item in dataList" :key="item.name" :span="6" :offset="1" style="color: black; font-size: 15px">
          {{ item.tableCount }} tables with {{ item.type }} seats
        </div>
        <!-- <div class="inner">
          <img
            src="../images/line.png"
            alt=""
            style="width: 5vw; margin-right: -2vw"
          />
          <img
            src="../images/tables2.png"
            alt=""
            style="width: 5vw; margin-left: 0"
          />
          <img
            src="../images/line.png"
            alt=""
            style="width: 5vw; margin-left: -2vw"
          />
          <h2>{{ dataList.type }}</h2>
        </div>
         <div class="inner">
          <img
            src="../images/line.png"
            alt=""
            style="width: 5vw; margin-right: -2vw;"
          /> 
           <img
            src="../images/line.png"
            alt=""
            style="width: 5vw; transform: rotate(90deg); top: -5vh; position: relative"
          />
          <img
            src="../images/tables2.png"
            alt=""
            style="width: 5vw; margin-left: -5vw"
          />  
          <img
            src="../images/line.png"
            alt=""
            style="width: 5vw; margin-left: -2vw"
          />  
           <img
            src="../images/line.png"
            alt=""
            style="width: 5vw; transform: rotate(90deg); top: 5vh; left: -8vw; position: relative"
          />
        </div> -->
      </div>
      <div class="add">
        <h2>Add new Table: </h2>
        <label style="color: black;">Type: </label> <a-input-number id="inputNumber" v-model:value="info.type" :min="1" /> 
        <br>
        <br>
        <label style="color: black">Table Count:</label> <a-input-number id="inputNumber" v-model:value="info.tableCount" :min="1" />
        <br>
        <br>
        <a-button class="button" @click="tableAdd()">Add</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { TableApi } from "@/api/table";

export default {
  data() {
    return {
      dataList: [],
      info: {
        type: 0,
        tableCount: 0,
        rid: localStorage.getItem("rid"),
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    tableAdd() {
      TableApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            this.loadData();
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadData() {
      const rid = localStorage.getItem("rid");
      TableApi("list", { rid }).then((res) => {
        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        }
      });
    },
  },
};
</script>


<style scoped>
.card {
  padding: 2vw;
  border-radius: 20px;
  border: 1px solid rgb(221, 127, 48);
  width: 30vw;
  background-color: white;
}
.inner{
    margin-bottom: 3vh;
}
.add{
    padding: 2vw;
  border-radius: 20px;
  border: 1px solid rgb(221, 127, 48);
  width: 30vw;
  margin-left: 2vw;
  background-color: white;
}
.button {
  width: 100px;
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(0, 0, 0);
  color: white;
  border: 1px solid black;
}
</style>