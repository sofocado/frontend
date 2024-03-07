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
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Work Time">
            <a-time-picker
              :value="
                info.workstarttime ? $dayjs(info.workstarttime * 1000) : null
              "
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
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Table">
            <a-input
              type="number"
              v-model:value="info.countTable"
              placeholder="Count Table"
            />
          </a-form-item>
        </a-col>

        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Img">
            <a-upload
              v-model:file-list="fileList"
              @customRequest = 'customRequest'
              list-type="picture-card"
              @preview="handlePreview"
            >
              <div v-if="fileList.length < 8">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
              </div>
            </a-upload>

            <a-modal
              :visible="previewVisible"
              :title="previewTitle"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <a-button type="primary" @click="restaurantAdd()">Send</a-button>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";
import { PlusOutlined } from '@ant-design/icons-vue';

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
    PlusOutlined,
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

<style scoped></style>
