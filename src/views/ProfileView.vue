<template>
  <div v-if = "dataList.length > 0">
      <h3> Restaurant Name: {{ dataList[dataList.length-1].name }}</h3>
      <h3>Description: {{ dataList[dataList.length-1].description }}</h3>
      <h3>Address: {{ dataList[dataList.length-1].address }}</h3>
      <h3>Work time starts: {{ dataList[dataList.length-1].workstarttime }}</h3>
      <h3>Work time ends: {{ dataList[dataList.length-1].workendtime }}</h3>
      <h3>Count of tables: {{ dataList[dataList.length-1].countTable }}</h3>
    </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";

export default {
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      RestaurantApi("list", {}, "GET")
       .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">



</style>
