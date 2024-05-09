<template>
  <div style="margin-top: -2em">
    <a-page-header title="Menu" ></a-page-header>
    <a-input-search
      class="search"
      v-model:value="value"
      size="large"
      @search="onSearch(value)"
    />
    <div class="categ"  >
      <div>
        <button class="button2" style="width: 3em" @click="loadData"  :class="{ 'selected': activeCategory === null }">All</button>
      </div>

      <div v-for="item in newArray" :key="item.name">
        <button class="button2" @click="catSort(item.name)" :class="{ 'selected': activeCategory === item.name }">
          {{ item.name }}
        </button>
      </div>
    </div>

    <div class="grid">
      <a-row
        justify="start"
        class="row-wrapper"
        style="display: flex; flex-wrap: wrap; margin-top: 30px"
      >
        <a-col v-for="item in dataList" :key="item.name" :span="6" :offset="1">
          <MenuCard
            :name="item.name"
            :menuId="item.menuId"
            :ingredient="item.ingredient"
            :category="item.category"
            :path="baseURL + item.path"
            :price="item.price"
            @load="loadData"
          />
        </a-col>
      </a-row>
      <div class="add">
        <div class="all">
          <div class="dashboard">
            <h1
              style="
                color: rgb(221, 127, 48);
                font-size: 150%;
                text-align: center;
              "
            >
              Add to menu
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
                <a-col :xs="24" :sm="20" :lg="12">
                  <a-form-item
                    label="Category"
                    :rules="[
                      { required: true, message: 'Please input category!' },
                    ]"
                  >
                    <a-select
                      v-model:value="info.category"
                      show-search
                      placeholder="Select a Category"
                      style="width: 150px"
                      :filter-option="filterOption"
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
                 <a-col :xs="24" :sm="10" :lg="20">
                  <a-form-item
                    label="Ingredients"
                    :rules="[
                      { required: true, message: 'Please input ingredients!' },
                    ]"
                  >
                    <a-textarea
                      v-model:value="info.ingredient"
                      placeholder="Description"
                      :rules="[{ required: true }]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="16" :lg="6">
                  <a-form-item
                    label="price"
                    :rules="[
                      { required: true, message: 'Please input your price!' },
                    ]"
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
                      <img
                        alt="example"
                        style="width: 100%"
                        :src="previewImage"
                      />
                    </a-modal>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
            <a-button class="button" type="primary" @click="menuAdd()"
              >Send</a-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MenuApi } from "@/api/menu";
import MenuCard from "@/components/MenuCard.vue";
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

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

export default {
  components: {
    MenuCard,
    PlusOutlined,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },
  data() {
    return {
      baseURL: config.baseURL+ "/",
      baseURL2: config.baseURL + "/upload/file",
      modalVisible: false,
      dataList: [],
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
      filterOption,
      menuId: 0,
      activeCategory: null,
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
  mounted() {
    this.loadData();
    this.categoryList();
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
    loadData() {
      this.activeCategory = null;
      const rid = localStorage.getItem("rid");
      MenuApi("list", { rid }).then((res) => {
        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        }
      });
    },
    onSearch(value) {
      const filter = {
        keyWord: value,
      };
      const rid = localStorage.getItem("rid");
      MenuApi("list", { rid, filter }).then((res) => {
        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        }
      });
    },
    catSort(value){
      this.activeCategory = value;
      const filter = {
        categoryName: value,
      };
      const rid = localStorage.getItem("rid");
      MenuApi("list", { rid, filter }).then((res) => {
        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        }
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
        this.fileList[0].url.substring(this.fileList[0].url.lastIndexOf("/") + 1) == this.baseURL 
      ) {
        this.info.path = this.fileList[0].url.substring(this.fileList[0].url.lastIndexOf("/") + 1);
      } else {
        this.info.path = "";
      }
      MenuApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            this.info.name = "";
            this.info.ingredient = "";
            this.info.category = "";
            this.info.path = "";
            this.info.price = 0;
            this.fileList = [];
            this.loadData();
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
  height: 5vh;
  margin-left: 0.5vw;
  margin-bottom: 1vw;
  width: 150px;
  border: 1px solid rgb(221, 127, 48);
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(221, 127, 48);
  color: white;
}
.button2 {
  height: 5vh;
  margin-bottom: 1vw;
  width: 150px;
  border: 1px solid rgb(221, 127, 48);
  background-color: white;
  border-radius: 20px;
}
.button2:hover {
  background-color: rgb(221, 127, 48);
  color: white;
}
.button2.selected {
  background-color: rgb(221, 127, 48);
  color: white;
}
.categ {
  margin-left: 2vw;
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  width: 59.8%;
  overflow-y: auto;
}
.categ::-webkit-scrollbar {
  display: none;
}
.photo {
  width: 20em;
  height: auto;
  display: block;
}
.grid {
  width: 70%;
  margin-top: 0.5em;
  top: 10em;
}
.add {
  top: 10vh;
  height: fit-content;
  border-radius: 20px;
  border: 1px solid rgb(221, 127, 48);
  right: 6em;
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
  width: 60%;
  margin-bottom: 1em;
}
</style>