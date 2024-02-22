<template>
  <div v-if="dataList.length > 0">
    <div v-for="(item, index) in dataList" :key="index">
      <span>{{ item.name }}</span>
      <span>{{ item.description }}</span>
      <span>{{ item.address }}</span>
      <span>{{ item.countTable }}</span>
    </div>
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
      RestaurantApi("list", {}).then((res) => {
        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>
