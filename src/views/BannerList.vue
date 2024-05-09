<template>
  <div class="all">
    <a-page-header title="Banner"> <a-button class="button" @click="handleAdd">Add</a-button></a-page-header>
         
    <div v-if="count == 0">
      <h1>You don't have a banner! Click this button to add a new banner</h1>
    </div>

    <div v-else>
       <div class="grid">
      <a-row
        justify="start"
        class="row-wrapper"
        style="display: flex; flex-wrap: wrap;"
      >
        <a-col v-for="item in info" :key="item.name" :span="7" :offset="1">
          <a-card
              hoverable
              style="
                width: 100%;
                height: 80%;
                margin-bottom: 2em;
              "
            >
              <template #cover>
                <img :alt="baseURL + item.path" :src="baseURL + item.path" class="photo"/>
              </template>
              <template #actions>
                <a-popconfirm
                  title="Delete"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="onDelete(item.bannerId)"
                >
                  <a>Delete</a>
                </a-popconfirm>
              </template>
              <a-card-meta
                :description="
                  $timeFormat(item.startTime, 1) +
                  '-' +
                  $timeFormat(item.endTime, 1)
                "
              >
              </a-card-meta>
            </a-card>
        </a-col>
      </a-row>
      </div>
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
      count: 0,
      baseURL: config.baseURL + "/",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const rid = localStorage.getItem("rid");
      BannerApi("list", { rid })
        .then((res) => {
          if (res.result_code == 0) {
            this.info = JSON.parse(JSON.stringify(res.data.rows));
            this.count = JSON.parse(JSON.stringify(res.data.recordcount));
          } else {
            console.log("error");
          }
        })
        .catch(() => {});
    },
    handleAdd() {
      this.$router.push({
        name: "BannerAdd",
      });
    },
    onDelete(bannerI) {
      var bannerId = bannerI;
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
.photo {
  width: 100%;
  border-radius: 30px;
  height: 9em;
  object-fit: cover;
  position: relative;
  display: block;
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
.grid {
  width: 100%;
  margin-top: 0.1em;
  margin-left: -2em;
}
</style>