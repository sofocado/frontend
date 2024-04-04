<template>
  <div>
    <div>
      <span>{{ userInfo.name }}</span>
      <span>{{ userInfo.description }}</span>
      <span>{{ userInfo.address }}</span>
      <span>{{ userInfo.countTable }}</span>
      <img :src="'http://192.168.1.154:1001/' + userInfo.path" alt="" />
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
        rid: "7a38fd24-52e0-42e5-bc27-7a5a244ef1b1",
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
