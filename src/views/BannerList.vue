<template>
  <div class="all">
    <a-page-header title="Banner"></a-page-header>

    <div>
      <a-table :columns="columns" :data-source="dataList" :pagination="false">
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key == 'path'">
            <div class="pr">
              <img
                :src="'http://172.20.10.9:2002/' + record.path"
                alt=""
                class="poto"
              />
            </div>
          </template>
          <template v-if="column.type == 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-if="column.key == 'startTime'">
            <div>{{ convertSecondsToTime(record.startTime) }}</div>
          </template>
          <template v-if="column.key == 'endTime'">
            <div>{{ convertSecondsToTime(record.endTime) }}</div>
          </template>
          <template v-if="column.key === 'Action'">
            <a-popconfirm
              title="Delete"
              ok-text="Yes"
              cancel-text="No"
              @confirm="onDelete(index)"
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
import dayjs from "dayjs";

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
      const rid = localStorage.getItem("rid")
      const bannerId = ""
      BannerApi("get", { rid, bannerId })
        .then((res) => {
          this.dataList = JSON.parse(JSON.stringify(res.data.rows));
        })
        .catch((error) => {
          console.log(error);
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
          title: "Banner",
          dataIndex: "path",
          key: "path",
        },
        {
          title: "Start Time",
          dataIndex: "startTime",
          key: "startTime",
        },
        {
          title: "End Time",
          dataIndex: "endTime",
          key: "endTime",
        },
        {
          title: "Action",
          key: "Action",
          width: 120,
          align: "center",
        },
      ]
    },
    convertSecondsToTime(seconds) {
      if (typeof seconds !== "number" || seconds < 0) {
        return "Invalid input";
      }
      const time = dayjs.unix(seconds);

      return time.format("DD.MM.YY HH:mm");
    },
    onDelete(index) {
      var bannerId = this.dataList[index].bannerId;
      BannerApi("delete", { bannerId }).then((res) => {
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
.all{
  width: 80vw;
}
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
.pr {
  width: 20vw;
  height: 25vh;
}
.poto {
  width: 100%;
  height: 25vh;
  display: block;
  border-radius: 20px;
  object-fit: cover;
  display: block;
}
</style>