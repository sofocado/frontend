<template>
  <div>
    <div>
      <span>{{ userInfo.name }}</span>
      <span>{{ userInfo.description }}</span>
      <span>{{ userInfo.address }}</span>
      <span>{{ userInfo.countTable }}</span>
      <img :src="'http://172.20.10.3:1001/' + userInfo.path" alt="" />
    </div>

    <a-button type="primary" @click="editProfile()">Edit</a-button>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";

export default {
  data() {
    return {
      dataList: [],
      userInfo: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      // const rid = this.$route.params.rid;
      RestaurantApi("get", {
        rid: "f4915f3c-042a-48b0-bf55-5854bfae2ff6",
      }).then((res) => {
        if (res.result_code === 0) {
          this.userInfo = JSON.parse(JSON.stringify(res.data));
        } else {
          console.log("Error");
        }
      });
    },
    editProfile() {
      this.$router.push({
        name: "ProfileUpdate",
        params: {
          rid: this.userInfo.rid,
        },
      });
    },
  },
};
</script>

<style lang="scss">



</style>
