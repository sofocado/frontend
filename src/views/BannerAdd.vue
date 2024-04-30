<template>
  <div>
    <a-page-header title="Add Banner"></a-page-header>
    <a-form layout="vertical" :model="info">
      <a-row wrap :gutter="[16, 0]">
        <a-col :xs="24" :sm="16" :lg="12">
          <a-form-item
            label="Work Start Time"
            :rules="[
              { required: true, message: 'Please input your phone number!' },
            ]"
          >
            <a-time-picker
              :value="info.startTime ? $dayjs(info.startTime * 1000) : null"
              :rules="[{ required: true }]"
              format="HH:mm"
              @change="(e) => (info.startTime = $toTimeStamp(e))"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="16" :lg="12">
          <a-form-item
            label="Work End Time"
            :rules="[
              { required: true, message: 'Please input your phone number!' },
            ]"
          >
            <a-time-picker
              :value="info.endTime ? $dayjs(info.endTime * 1000) : null"
              format="HH:mm"
              :rules="[{ required: true }]"
              @change="(e) => (info.endTime = $toTimeStamp(e))"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="16" :lg="6">
          <a-form-item label="Img">
            <a-upload
              v-model:file-list="fileList"
              :action="baseURL"
              list-type="picture-card"
              @preview="handlePreview"
              name="files"
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

    <a-button class="button" @click="bannerAdd()">Send</a-button>
  </div>
</template>

<script>
import { BannerApi } from "@/api/banner";
import { PlusOutlined } from "@ant-design/icons-vue";
import config from "@/config/index.js";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  components: {
    PlusOutlined,
  },
  data() {
    return {
      baseURL: config.baseURL + "/upload/file",
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      info: {
        path: "",
        endTime: "",
        startTime: "",
        rid: localStorage.getItem("rid")
      },
    };
  },

  methods: {
    bannerAdd() {
      if (
        this.fileList.length > 0 &&
        this.fileList[0].response &&
        this.fileList[0].response.files &&
        this.fileList[0].response.files.length > 0
      ) {
        this.info.path = this.fileList[0].response.files[0].path;
      } else if (
        this.fileList.length > 0 &&
        this.fileList[0].url &&
        this.fileList[0].url.substring(0, 22) == "http://172.20.10.9:2002/"
      ) {
        this.info.path = this.fileList[0].url.substring(22);
      } else {
        this.info.path = "";
      }
      BannerApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            this.$router.push({
              name: "Banner",
            });
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCancel() {
      this.previewVisible = false;
      this.previewTitle = "";
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
      this.previewTitle =
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    },
  },
};
</script>


<style scoped>
.button {
  width: 150px;
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
}
.button:hover {
  background-color: black;
  color: white;
  border: 1px solid black;
}
</style>