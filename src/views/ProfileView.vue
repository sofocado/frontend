<template>
  <div>
    <div>
      <span>{{ userInfo.name }}</span>
      <span>{{ userInfo.description }}</span>
      <span>{{ userInfo.address }}</span>
      <span>{{ userInfo.workstarttime }}</span>
      <span>{{ userInfo.workendtime }}</span>
      <span>{{ userInfo.category }}</span>
      <span>{{ userInfo.countTable }}</span>
       <img :src="'http://localhost:1001/' + userInfo.path" alt="" />
    </div>

    <a-button class="button" @click="editProfile()">Edit</a-button>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";

export default {
  data() {
    return {
      userInfo: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const rid = this.$route.query.rid;
      console.log(rid);
      RestaurantApi("get", { rid }).then((res) => {
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
        query: {
          rid: this.$route.query.rid
        },
      });
    },
  },
};
</script>

<style lang="scss">
.button {
  width: 150px;
  background-color: rgb(123, 102, 255);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(37, 31, 77);
  color: white;
  border: 1px solid black;
}


</style>
