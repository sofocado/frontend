<template>
  <div>
    <div>
      <span>{{ userInfo.name }}</span>
      <span>{{ userInfo.description }}</span>
      <span>{{ userInfo.address }}</span>
      <span>{{ userInfo.countTable }}</span>
    </div>

    <a-button type="primary" @click="editProfile()">Edit</a-button>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      RestaurantApi("get", {
        name: "Shafran",
      }).then((res) => {
        if (res.result_code === 0) {
          this.userInfo = JSON.parse(JSON.stringify(res.data));
          console.log(this.userInfo._id);
        } else {
          console.log("Error");
        }
      });
    },
    editProfile() {
      this.$router.push({
        name: "ProfileUpdate",
        params: {
          id: this.userInfo._id, 
        },
      });
    },
  },
};
</script>

<style lang="scss"></style>
