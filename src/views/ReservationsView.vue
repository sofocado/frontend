<template>
   <a-table :dataSource="dataList" :columns="columns" />


</template>

<script>
import { RestaurantApi } from "@/api/restaurant";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "No of people",
    dataIndex: "numberOfPeople",
    key: "numberOfPeople",
  },
  {
    title: "Place",
    dataIndex: "place",
    key: "place",
  },
];


export default {
  data() {
    return {
      columns,
      dataList: [],
    };
  },

  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      RestaurantApi("/reservations/list", {}, "GET")
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