<template>
  <div>
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
            label="Ingredients"
            :rules="[{ required: true, message: 'Please input ingredients!' }]"
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
              style="width: 200px"
              :filter-option="filterOption"
              @change="handleChange"
              @click="categoryList()"
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
              :action="baseURL2"
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
    <div style="display: flex; flex-direction: row; margin-left: 2em">
      <a-button class="button" type="primary" @click="menuAdd()">Send</a-button>
      <a-button class="button2" type="primary" @click="deleteMenu()">Delete</a-button>
    </div>
  </div>
</template>

<script>
import { MenuApi } from "@/api/menu";
import { MenuCatApi } from "@/api/menuCat";
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
const handleChange = (value) => {
  console.log(value);
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
  props: {
    name: String,
    ingredient: String,
    category: String,
    path: String,
    price: Number,
    menuId: String,
  },
  data() {
    return {
      baseURL: config.baseURL + "/uploads/",
      baseURL2: config.baseURL + "/upload/file",
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
        name: this.name,
        ingredient: this.ingredient,
        category: this.category,
        path: this.path,
        price: this.price,
        menuId: this.menuId,
        rid: localStorage.getItem("rid"),
      },
    };
  },
  mounted() {
    this.loadData();
    this.categoryList();
  },
  methods: {
    loadData() {
      this.fileList = [
        {
          url: this.path,
        },
      ];
    },
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
        this.fileList[0].url.substring(0, this.fileList[0].url.lastIndexOf("/") + 1) == this.baseURL 
      ) {
        this.info.path = "uploads/" + this.fileList[0].url.substring(this.fileList[0].url.lastIndexOf("/") + 1, this.fileList[0].url.length );
      } else {
        this.info.path = "";
      
      }
      const menuId = this.info.menuId;
      const updatedData = this.info;
      MenuApi("update", { menuId, ...updatedData })
        .then((res) => {
          if (res.result_code === 0) {
               this.$emit('exit', true)
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteMenu() {
      const menuId = this.info.menuId;
      MenuApi("delete", { menuId })
        .then((res) => {
          if (res.result_msg == "Menu deleted successfully") {
             this.$emit('exit', true)
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCancel() {
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
  margin-left: 2em;
  width: 150px;
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
}
.button2 {
  margin-left: 2em;
  width: 150px;
  background-color: white;
  border: 1px solid rgb(221, 127, 48);
  border-radius: 20px;
  color: black;
}
.button2:hover {
  background-color: rgb(0, 0, 0);
  color: white;
  border: 1px solid black;
}
.button:hover {
  background-color: rgb(0, 0, 0);
  color: white;
  border: 1px solid black;
}
.photo {
  width: 100%;
  height: auto;
  display: block;
}
.grid {
  width: 70%;
  margin-top: 0.5em;
}
.add {
  top: 10vh;
  height: fit-content;
  border-radius: 20px;
  border: 1px solid rgb(221, 127, 48);
  right: 5em;
  position: fixed;
  width: 25vw;
  background-color: white;
}
.cards {
  width: 100%;
}
.dashboard {
  padding: 1vw;
  margin-left: 0;
  border-radius: 20px;
  width: 100%;
  height: fit-content;
}
.search {
  margin-left: 2vw;
  width: 45vw;
}
</style>