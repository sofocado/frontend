<template>
  <div>
    <!-- <a-input-search
      class="search"
      v-model:value="value"
      enter-button
      size="large"
      @search="onSearch"
    />
    <a-page-header title="Menu"></a-page-header> -->
    <div class="grid">
      <a-row
        justify="start"
        class="row-wrapper"
        style="display: flex; flex-wrap: wrap"
      >
        <a-col v-for="item in dataList" :key="item.name" :span="6" :offset="1">
          <MenuCard
            :name="item.name"
            :item-id="item.menuId"
            :description="item.ingredient"
            :image="item.path"
            :price="item.price"
            @click="deleteMenu"
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
                    :rules="[
                      { required: true, message: 'Please input category!' },
                    ]"
                  >
                    <a-select
                      v-model:value="info.category"
                      show-search
                      placeholder="Select a Category"
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
            <a-modal
              v-model:visible="modalVisible"
              @cancel="handleCancel"
              @ok="deleteMen"
              title="Delete Menu"
            >
              <!-- Modal content goes here -->
              <p>Do you want to delete menu?</p>
            </a-modal>
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
    MenuCard,
    PlusOutlined,
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },
  data() {
    return {
      modalVisible: false,
      dataList: [],
      columns: [],
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
  mounted() {
    this.loadData();
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
      const rid = localStorage.getItem("rid");
      MenuApi("list", { rid }).then((res) => {
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
        this.fileList[0].url.substring(0, 22) == "http://172.20.10.9:2002/"
      ) {
        this.info.path = this.fileList[0].url.substring(22);
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
    deleteMenu() {
      this.modalVisible = true;
    },
    deleteMen() {
      var menuId = "";
      MenuApi("delete", { menuId }).then((res) => {
        if (res.result_code === 0) {
          this.loadData();
        }
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
  margin-left: 6vw;
  width: 150px;
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
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