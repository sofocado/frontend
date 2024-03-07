<template>
  <div class="dashboard">
    <h2>Add Restaurant</h2>

    <a-form layout="vertical" :model="info">
      <a-col :xs="24" :sm="16" :lg="10">
        <a-form-item label="Name">
          <a-input v-model:value="info.name" placeholder="name"  />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="16" :lg="10">
        <a-form-item label="Description">
          <a-textarea
            v-model:value="info.description"
            placeholder="Autosize height with minimum and maximum number of lines"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="16" :lg="10">
        <a-form-item label="Address">
          <a-input v-model:value="info.address" placeholder="Name" />
        </a-form-item>
      </a-col>
      <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Work Time">
            <a-time-picker
              :value="info.workstarttime ? $dayjs(info.workstarttime * 1000) : null"
              format="HH:mm"
              @change="(e) => (info.workstarttime = $toTimeStamp(e))"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Work Time">
            <a-time-picker
              :value="info.workendtime ? $dayjs(info.workendtime * 1000) : null"
              format="HH:mm"
              @change="(e) => (info.workendtime = $toTimeStamp(e))"
            />
          </a-form-item>
        </a-col>
      <a-col :xs="24" :sm="16" :lg="10">
        <a-form-item label="Count of Tables">
          <a-input
            type="number"
            v-model:value="info.countTable"
            placeholder="Count Table"
          />
        </a-form-item>
      </a-col>
      <!-- <a-upload
        v-model:file-list="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
       <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
      </a-upload> -->
    </a-form>

    <a-button class="button" type="primary" @click="restaurantAdd()"
      >Send</a-button
    >
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
          if (res.message == "Restaurant added successfully") {
            console.log("ok");
            this.$router.push({ name: "Profile", params: {id: res.data._id}});
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

<style scoped>
.button {
  width: 150px;
  background-color: black;
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(210, 210, 210);
  color: black;
  border: 1px solid black;
}
</style>
