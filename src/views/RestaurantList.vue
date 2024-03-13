<template>
  <div>
    <span>Hello</span>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";

export default {
  
  data() {
    return {};
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      RestaurantApi("list", {}).then((res) => {
        if (res.result_code === 0) {
          console.log("ok");
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>
