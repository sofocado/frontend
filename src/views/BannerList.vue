<template>
  <div>
    <a-page-header title="Banner"></a-page-header>

    <div>
      <a-table :columns="columns" :data-source="dataList" :pagination="false">
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key == 'path'">
            <div class="pr">
              <img
                :src="'http://localhost:2002/' + record.path"
                alt=""
                class="photo"
              />
            </div>
          </template>
          <template v-if="column.type == 'index'">
            <span>{{ index }}</span>
          </template>
          <template v-if="column.key === 'Action'">
            <a-popconfirm
              title="Delete"
              ok-text="Yes"
              cancel-text="No"
              @confirm="onDelete(record)"
            >
              <a>Delete</a>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
      <a-button class="button" @click="handleAdd">Add</a-button>
    </div>
  </div>
</template>

<script>
import { BannerApi } from "@/api/banner";
import { message } from "ant-design-vue";
export default {
  data() {
    return {
      dataList: [],
      columns: [],
      bannerId: null,
    };
  },
  created() {
    this.setColumns();
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      BannerApi("list", {}).then((res) => {
        if (res.result_code === 0) {
          this.dataList = JSON.parse(JSON.stringify(res.data));
        }
      });
    },
    handleAdd() {
      this.$router.push({
        name: "BannerAdd",
      });
    },
    setColumns() {
      this.columns = [
        {
          title: "#",
          type: "index",
          width: "55px",
          align: "center",
          fixed: "left",
        },
        {
          title: "Banner ID",
          key: "bannerId",
          dataIndex: "bannerId",
          fixed: "right",
          width: 100,
          hidden: true,
        },
        {
          title: "Banner",
          dataIndex: "path",
          key: "path",
        },
        {
          title: "Action",
          key: "Action",
          width: 120,
          align: "center",
        },
      ].filter((item) => !item.hidden);
    },
    onDelete(record) {
      var key = record.bannerId;
      console.log(record);
      BannerApi("delete", { key }).then((res) => {
        if (res.result_code === 0) {
          message.success("Banner deleted");
          this.loadData();
        }
      });
    },
  },
};
</script>

<style scoped>
.button {
  color: white;
  width: 150px;
  background-color: rgb(123, 102, 255);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(37, 31, 77);
  color: white;
  border: 1px solid black;
}
.pr {
  width: 10vw;
  height: 20vh;
  overflow: hidden;
}
.photo {
  width: 100%;
  height: auto;
  display: block;
}
</style>