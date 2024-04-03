<template>
  <div class="all">
    <div class="dashboard">
      <h2>Add Restaurant</h2>
      <a-form layout="vertical" :model="info">
        <a-row wrap :gutter="[16, 0]">
          <a-col :xs="24" :sm="16" :lg="12">
            <a-form-item
              label="Name"
              :rules="[
                {
                  required: true,
                  message: 'Please input the name of the restaurant!',
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
              label="Address"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-input
                v-model:value="info.address"
                placeholder="Name"
                :rules="[{ required: true }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="16" :lg="24">
            <a-form-item
              label="Description"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-textarea
                v-model:value="info.description"
                placeholder="Autosize height with minimum and maximum number of lines"
                :rules="[{ required: true }]"
                :rows="4"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="10" :lg="5">
            <a-form-item
              label="Work Start Time"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-time-picker
                :value="
                  info.workstarttime ? $dayjs(info.workstarttime * 1000) : null
                "
                :rules="[{ required: true }]"
                format="HH:mm"
                @change="(e) => (info.workstarttime = $toTimeStamp(e))"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="10" :lg="12">
            <a-form-item
              label="Work End Time"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-time-picker
                :value="
                  info.workendtime ? $dayjs(info.workendtime * 1000) : null
                "
                format="HH:mm"
                :rules="[{ required: true }]"
                @change="(e) => (info.workendtime = $toTimeStamp(e))"
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
                ><a-select-option
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
              label="Table"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-input
                type="number"
                v-model:value="info.countTable"
                placeholder="Count Table"
                :rules="[{ required: true }]"
              />
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="16" :lg="6">
            <a-form-item
              label="Phone"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-input
                type="phoneNumber"
                v-model:value="info.phone"
                placeholder="Phone"
                :rules="[{ required: true }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="16" :lg="6">
            <a-form-item
              label="Averagecheque"
              :rules="[
                { required: true, message: 'Please input your averageCheque!' },
              ]"
            >
              <a-input
                type="avgCheque"
                v-model:value="info.avgCheque"
                placeholder="Average cheque"
                :rules="[{ required: true }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="20" :lg="20">
            <a-form-item
              label="Parking"
              :rules="[
                {
                  required: true,
                  message:
                    'Please select Yes if you have parking and no otherwise!',
                },
              ]"
            >
              <a-radio-group v-model:value="info.parking" name="radioGroup">
                <a-radio value="1">Yes</a-radio>
                <a-radio value="0">No</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="20" :lg="20">
            <a-form-item
              label="Praying"
              :rules="[
                {
                  required: true,
                  message:
                    'Please select Yes if you have Praying room and no otherwise!',
                },
              ]"
            >
              <a-radio-group v-model:value="info.prayingRoom" name="radioGroup">
                <a-radio value="1">Yes</a-radio>
                <a-radio value="0">No</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="16" :lg="6">
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
          </a-col>
        </a-row>
      </a-form>

      <a-button class="button" type="primary" @click="restaurantAdd()"
        >Send</a-button
      >
    </div>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";
import { AuthorizationApi } from "@/api/auth";
import { CategoryApi } from "@/api/category";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useAppStore } from "@/store/index.js";

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
    VNodes: (_, {
      attrs,
    }) => {
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
          cid: "",
          name: "",
        },
      ],
      info: {
        name: "",
        description: "",
        address: "",
        workstarttime: 0,
        workendtime: 0,
        category: "",
        countTable: 0,
        path: "",
        phone: "",
        avgCheque: 0,
        parking: 0,
        prayingRoom: 0,
      },
    };
  },
  mounted() {
    this.categoryList();
  },
  methods: {
    categoryList() {
      CategoryApi("list", {}).then((res) => {
        if (res.result_code === 0) {
          this.newArray = JSON.parse(JSON.stringify(res.data));
          console.log(this.newArray);
        } else {
          console.log("Error");
        }
      });
    },
    addCategory(){
        this.$router.push({
              name: "CategoryAdd",
            });
    },
    restaurantAdd() {
      if (this.fileList.length > 0) {
        this.info.path = this.fileList[0].response.files[0].path;
      } else {
        this.info.path = "";
      }
      RestaurantApi("add", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            const rid = res.data.rid;
            const store = useAppStore();
            const uid = store.userInfo.user.uid;
            localStorage.setItem("rid", rid);
            AuthorizationApi("update", {
              rid: rid,
              uid: uid,
            })
              .then((res) => {
                if (res.result_code === 0) {
                  console.log("Updated");
                } else {
                  console.log(res.message);
                }
              })
              .catch((error) => {
                console.log(error);
              });
            this.$router.push({
              name: "Profile",
              query: { rid: res.data.rid },
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
.all {
  background-color: rgb(37, 31, 77);
  padding-left: 25vw;
  padding-right: 25vw;
  padding-top: 5vw;
  padding-bottom: 5vw;
}
.dashboard {
  padding: 2vw;
  border-radius: 2%;
  width: 50vw;
  height: fit-content;
  background-color: white;
}
h2 {
  width: 100%;
  text-align: center;
}
.button {
  width: 150px;
  background-color: rgb(123, 102, 255);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(37, 31, 77);
  color: white;
  border: 1px solid black;
}
</style>
