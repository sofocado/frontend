<template>
  <div class="all">
    <a-page-header title="Banner"></a-page-header>
    <div v-if="info.path == ''" :key="info.name">
      <h1>You don't have a banner! Click this button to add a new banner</h1>
      <a-button class="button" @click="handleAdd">Add</a-button>
    </div>

    <div v-if="info.path != ''" :key="info.name">
      <a-card hoverable style="width: 40%; margin-left: 1.9em">
        <template #cover>
          <img :alt="baseURL + info.path" :src="baseURL + info.path" />
        </template>
        <template #actions>
          <a-popconfirm
            title="Delete"
            ok-text="Yes"
            cancel-text="No"
            @confirm="onDelete()"
          >
            <a>Delete</a>
          </a-popconfirm>
        </template>
        <a-card-meta
          :description="
            $timeFormat(info.startTime, 1) + '-' + $timeFormat(info.endTime, 1)
          "
        >
        </a-card-meta>
      </a-card>
    </div>
  </div>
</template>

<script>
import { BannerApi } from "@/api/banner";
import { message } from "ant-design-vue";
import config from "@/config/index.js";

export default {
  data() {
    return {
      info: {
        bannerId: "",
        path: "",
        startTime: 0,
        endTime: 0,
      },
      baseURL: config.baseURL + "/",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const rid = localStorage.getItem("rid");
      const bannerId = "";
      BannerApi("get", { rid, bannerId })
        .then((res) => {
          if (res.result_code == 0) {
            this.info = JSON.parse(JSON.stringify(res.data));
          }
          else{
            console.log("error")
          }
        })
        .catch(() => {
          this.info.path = "";
        });
    },
    handleAdd() {
      this.$router.push({
        name: "BannerAdd",
      });
    },
    onDelete() {
      var bannerId = this.info.bannerId;
      BannerApi("delete", { bannerId }).then((res) => {
        if (res.result_code == 0) {
          this.loadData();
          message.success("Banner deleted");
        }
      });
    },
  },
};
</script>

<style scoped>
.all {
  width: 80vw;
}
.button {
  margin-top: 2em;
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