<template>
  <div class="dashboard">
    <h2>Add Restaurant</h2>

    <a-form layout="vertical" :model="info">
      <a-row wrap :gutter="[16, 0]">
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Name">
            <a-input v-model:value="info.name" placeholder="Name" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Description">
            <a-input
              v-model:value="info.description"
              placeholder="Description"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Address">
            <a-input v-model:value="info.address" placeholder="Name" />
          </a-form-item>
        </a-col>
        <!-- <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Work Time">
            <a-time-range-picker v-model="info.time" format="HH:mm"/>
          </a-form-item>
        </a-col> -->
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Table">
            <a-input type="number" v-model:value="info.countTable" placeholder="Count Table" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-button type="primary" @click="restaurantAdd()">Send</a-button>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";

export default {
  data() {
    return {
      info: {
        name: "",
        description: "",
        address: "",
        // time: [],
        countTable: 0,
      },
    };
  },
  methods: {
    restaurantAdd() {
      RestaurantApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            console.log("ok");
            this.$router.push({ name: "Profile" });
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
