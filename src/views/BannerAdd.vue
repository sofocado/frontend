<template>
    <div>
         <a-form-item label="Img">
            <a-upload
              v-model:file-list="fileList"
              action="http://localhost:2002/upload/file"
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
           <a-button class="button" type="primary" @click="bannerAdd()"
      >Send</a-button>
    </div>
</template>

<script>
import { BannerApi } from "@/api/banner";


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default({
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      info: {
        path: "",
      },
    };
  },

  methods: {
    bannerAdd() {
      if (this.fileList.length > 0) {
        this.info.path = this.fileList[0].response.files[0].path;
      } else {
        this.info.path = "";
      }
      BannerApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            this.$router.push({
               name: "Banner"
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

})
</script>
