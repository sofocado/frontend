<template>
  <div class="all">
    <div class="dashboard">
      <h1 style="color: black; font-size: 200%; text-align: center">
        Add Item to menu
      </h1>
      <a-form layout="vertical" :model="info">
        <a-row wrap :gutter="[16, 0]">
          <a-col :xs="24" :sm="16" :lg="12">
            <a-form-item
              label="Name"
              :rules="[
                {
                  required: true,
                  message: 'Please input the name of the item!',
                },
              ]"
            >
              <a-input
                v-model:value="info.name"
                placeholder="Name"
                :rules="[{ required: true }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="10" :lg="12">
            <a-form-item
              label="Ingradients"
              :rules="[
                { required: true, message: 'Please input ingredients!' },
              ]"
            >
              <a-input
                v-model:value="info.ingredient"
                placeholder="ingredient"
                :rules="[{ required: true }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="20" :lg="20">
            <a-form-item
              label="Category"
              :rules="[{ required: true, message: 'Please input category!' }]"
            >
              <a-select
                v-model:value="info.category"
                show-search
                placeholder="Select a Category"
                style="width: 200px"
                :filter-option="filterOption"
                @change="handleChange"
                @click="categoryList"
              >
                <a-select-option
                  v-for="option in newArray"
                  :key="option.name"
                  :value="option.name"
                  >{{ option.name }}</a-select-option
                >
                <template #dropdownRender="{ menuNode: menu }">
                  <v-nodes :vnodes="menu" />
                  <a-divider style="margin: 4px 0" />
                  <div
                    style="padding: 4px 8px; cursor: pointer"
                    @click="addCategory"
                  >
                    <plus-outlined />
                    Add item
                  </div>
                </template>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="16" :lg="6">
            <a-form-item
              label="price"
              :rules="[{ required: true, message: 'Please input your price!' }]"
            >
              <a-input
                type="number"
                v-model:value="info.price"
                placeholder="price"
                :rules="[{ required: true }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="16" :lg="6">
            <a-form-item label="Img">
              <a-upload
                v-model:file-list="fileList"
                action="http://172.20.10.9:2002/upload/file"
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

      <a-button class="button" type="primary" @click="menuAdd()">Send</a-button>
    </div>
  </div>
</template>

<script>
import { MenuApi } from "@/api/menu";
import { MenuCatApi } from "@/api/menuCat";
import { PlusOutlined } from "@ant-design/icons-vue";
// import { useAppStore } from "@/store/index.js";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

export default {
  components: {
    PlusOutlined,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },

  data() {
    return {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      handleChange,
      filterOption,
      newArray: [
        {
          mcid: "",
          name: "",
        },
      ],
      info: {
        name: "",
        ingredient: "",
        category: "",
        path: "",
        price: 0,
        rid: localStorage.getItem("rid"),
      },
    };
  },
  methods: {
    categoryList() {
      MenuCatApi("list", {}).then((res) => {
        if (res.result_code === 0) {
          this.newArray = JSON.parse(JSON.stringify(res.data.rows));
        } else {
          console.log("Error");
        }
      });
    },
    addCategory() {
      this.$router.push({
        name: "MenuCatAdd",
      });
    },
    menuAdd() {
      if (this.fileList.length > 0) {
        this.info.path = this.fileList[0].response.files[0].path;
      } else {
        this.info.path = "";
      }
      MenuApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            this.$router.push({
              name: "MenuList",
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
.dashboard {
  padding: 2vw;
  margin-left: 10vw;
  border-radius: 2%;
  width: 60vw;
  height: fit-content;
  background-color: white;
}
h2 {
  width: 100%;
  text-align: center;
}
.button {
  width: 150px;
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(0, 0, 0);
  color: white;
  border: 1px solid black;
}
</style>
