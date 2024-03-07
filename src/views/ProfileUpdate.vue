<template>
  <div>
    <a-input placeholder="descrioption" v-model:value="info.description" />
    <a-input placeholder="address" v-model:value="info.address" />
    <a-input placeholder="countTable" v-model:value="info.countTable" />
  </div>

  <a-button type="primary" @click="update()">Send</a-button>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";
export default {
  data() {
    return {
      info: {
        rid: "9103729d-2351-4bfe-b1a6-a851465a2eb9",
        description: "",
        address: "",
        countTable: "",
      },
    };
  },
  methods: {
    update() {
      RestaurantApi("update", this.info).then((res) => {
        if (res.result_code === 0) {
          console.log(this.id);
          console.log("Success!");
        } else {
          console.log("Error");
        }
      });
    },
  },
};
</script>

<style></style>
