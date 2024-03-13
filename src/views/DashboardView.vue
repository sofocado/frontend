<template>
  <div class="dashboard">
    <h2>Add Restaurant</h2>
    <a-form layout="vertical" :model="info">
      <a-row wrap :gutter="[16, 0]">
        <a-col :xs="24" :sm="10" :lg="12">
          <a-form-item label="Name">
            <a-input v-model:value="info.name" placeholder="Name" />
          </a-form-item>
        </a-col>
         <a-col :xs="24" :sm="10" :lg="12">
          <a-form-item label="Description">
            <a-input
              v-model:value="info.description"
               placeholder="Autosize height with minimum and maximum number of lines"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="10" :lg="12">
          <a-form-item label="Address">
            <a-input v-model:value="info.address" placeholder="Name" />
          </a-form-item>
        </a-col>
         <a-col :xs="24" :sm="10" :lg="12">
          <a-form-item label="Work Start Time">
            <a-time-picker
              :value="
                info.workstarttime ? $dayjs(info.workstarttime * 1000) : null
              "
              format="HH:mm"
              @change="(e) => (info.workstarttime = $toTimeStamp(e))"
            />
          </a-form-item>
        </a-col>
       <a-col :xs="24" :sm="10" :lg="12">
          <a-form-item label="Work End Time">
            <a-time-picker
              :value="
                info.workendtime ? $dayjs(info.workendtime * 1000) : null
              "
              format="HH:mm"
              @change="(e) => (info.workendtime = $toTimeStamp(e))"
            />
          </a-form-item>
        </a-col>
     <a-col :xs="24" :sm="10" :lg="12">
        <a-form-item label="Count of Tables">
          <a-input
            type="number"
            v-model:value="info.countTable"
            placeholder="Count Table"
          />
        </a-form-item>
      </a-col>
      <a-upload
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
      </a-upload>
      </a-row>
    </a-form>

    <a-button class="button" type="primary" @click="restaurantAdd()"
      >Send</a-button
    >
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  components: {

  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      info: {
        name: "",
        description: "",
        address: "",
        workstarttime: 0,
        workendtime: 0,
        countTable: 0,
        img_url: "",
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
    handleCancel() {
      this.previewVisible = false
      this.previewTitle = ''
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
      this.previewTitle = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
    },
    customRequest() {
      RestaurantApi("add", this.info).then((res) => {
        if(res.result_code === 0) {
          console.log('ok')
        }
      })
    }
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
