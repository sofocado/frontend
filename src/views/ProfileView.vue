<template>
  <div>
    <h1 style="color: black; font-size: 200%">Restaurant Profile</h1>
    <div class="all">
      <div class="inner">
        <div class="info1">
          <a-modal
            v-model:visible="modalVisible"
            title="Photos"
            style="height: fit-content; border-radius: 10px; width: 40em"
            :footer="null"
          >
            <a-carousel arrows>
              <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
                  <left-circle-outlined />
                </div>
              </template>
              <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                  <right-circle-outlined />
                </div>
              </template>
              <div v-for="item in reversedPath" :key="item">
                <div class="photo-back1">
                  <img
                    :src="baseURL + item"
                    alt=""
                    class="photo1"
                    @click="handlePreview"
                  />
                </div>
              </div>
            </a-carousel>
          </a-modal>

          <div v-for="(item, index) in reversedPath" :key="item">
            <div v-if="index == 0" :key="item">
              <div class="photo-back">
                <img
                  :src="baseURL + item"
                  alt=""
                  class="photo"
                  @click="handlePreview"
                />
              </div>
            </div>
            <div style="display: flex; flex-direction: row">
              <div v-if="index >= 1" :key="item">
                <div class="photo-back2">
                  <img
                    :src="baseURL + item"
                    alt=""
                    class="photo2"
                    @click="handlePreview"
                  />
                </div>
              </div>
            </div>
          </div>

          <h1 class="name">{{ userInfo.name }}</h1>
          <a-button class="button2" @click="logout"
            ><img src="../images/login.png" alt="" class="login_photo" /> Log
            out</a-button
          >
        </div>

        <div class="info2">
          <h1 class="aa">Restaurant Information</h1>
          <h1 class="details">Details</h1>
          <h6 class="texts">{{ userInfo.description }}</h6>
          <div class="ew">
            <div>
              <h1 class="address">Address</h1>
              <h6 class="texts1">{{ userInfo.address }}</h6>
            </div>
            <div>
              <h1 class="address" style="margin-left: 2vw">Work time</h1>
              <h6 class="work">
                {{ convertSecondsToTime(userInfo.workstarttime) }}-{{
                  convertSecondsToTime(userInfo.workendtime)
                }}
              </h6>
            </div>
          </div>
          <div class="ew">
            <div>
              <h1 class="address">Categories</h1>
              <h6 class="cate">{{ userInfo.category }}</h6>
            </div>
            <div>
              <h1 class="address" style="margin-left: 2vw">Count of tables</h1>
              <h6 class="work" style="width: 5vw">{{ userInfo.countTable }}</h6>
            </div>
            <div>
              <h1 class="address" style="margin-left: 2vw">Average Cheque</h1>
              <h6 class="work">{{ userInfo.avgCheque }}</h6>
            </div>
          </div>
          <div class="ew">
            <div>
              <h1 class="address">Parking</h1>
              <h6 class="cate">{{ park() }}</h6>
            </div>
            <div>
              <h1 class="address" style="margin-left: 2vw">Praying Room</h1>
              <h6 class="work">{{ pray() }}</h6>
            </div>
          </div>

          <a-button class="button" @click="editProfile()">Edit</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";
import { AuthorizationApi } from "@/api/auth";
import dayjs from "dayjs";
import config from "@/config/index.js";

export default {
  data() {
    return {
      modalVisible: false,
      baseURL: config.baseURL + "/",
      baseURL2: config.baseURL + "/upload/file",
      userInfo: {
        path: []
      },
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    reversedPath() {
      return this.userInfo.path.slice().reverse();
    }
  },
  methods: {
    loadData() {
      const rid = localStorage.getItem("rid");
      RestaurantApi("get", { rid }).then((res) => {
        if (res.result_code === 0) {
          this.userInfo = JSON.parse(JSON.stringify(res.data));
        } else {
          console.log("Error");
        }
      });
    },
    convertSecondsToTime(seconds) {
      if (typeof seconds !== "number" || seconds < 0) {
        return "Invalid input";
      }
      const time = dayjs.unix(seconds);

      return time.format("HH:mm");
    },
    park() {
      if (this.userInfo.parking == 1) {
        return "Available";
      } else return "Not Available";
    },
    pray() {
      if (this.userInfo.prayingRoom == 1) {
        return "Available";
      } else return "Not Available";
    },
    logout() {
      const rid = localStorage.getItem("rid");
      AuthorizationApi("logout", { rid }, "DELETE").then(() => {
        localStorage.clear();
        this.$router.push({
          name: "Login",
        });
      });
    },
    editProfile() {
      this.$router.push({
        name: "UpdateProfilePage",
      });
    },
    handlePreview() {
      this.modalVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
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
.info1 {
  background-color: white;
  height: 70vh;
  border-radius: 20px;
  width: 15vw;
}
.aa {
  color: rgb(221, 127, 48);
  font-size: 1.5vw;
  margin-bottom: 5vh;
}
.info2 {
  margin-left: 2vw;
  padding-top: 5vh;
  padding-left: 2vw;
  padding-bottom: 4vh;
  background-color: white;
  height: fit-content;
  border-radius: 20px;
  width: 63vw;
}
.photo-back {
  margin-top: 10%;
  margin-left: 8%;
  width: 12em;
  object-fit: cover;
  height: 12em;
  overflow: hidden;
}
.photo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 20px;
}
.photo-back1 {
  width: 100%;
  object-fit: cover;
  height: 30em;
  overflow: hidden;
}
.photo1 {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.photo-back2 {
  margin-top: 10%;
  margin-left: 40%;
  width: 3em;
  height: 3em;
  overflow: hidden;
}
.photo2 {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 10px;
}
.texts {
  padding: 3%;
  border-radius: 20px;
  height: fit-content;
  width: 90%;
  word-wrap: break-word;
  color: black;
  background-color: rgb(245, 244, 244);
  font-size: 1vw;
  margin-bottom: 2%;
}
.ew {
  display: flex;
  flex-direction: row;
}
.cate {
  padding: 1vw;
  border-radius: 20px;
  height: fit-content;
  width: fit-content;
  color: black;
  background-color: rgb(245, 244, 244);
  font-size: 1vw;
}
.texts1 {
  padding: 1vw;
  border-radius: 20px;
  height: fit-content;
  width: 30vw;
  color: black;
  background-color: rgb(245, 244, 244);
  font-size: 1vw;
}
.work {
  margin-left: 2vw;
  padding: 1vw;
  border-radius: 20px;
  height: fit-content;
  width: fit-content;
  color: black;
  background-color: rgb(245, 244, 244);
  font-size: 1vw;
}
.all {
  display: flex;
  flex-direction: row;
}
.details {
  font-size: 1vw;
  color: black;
}
.address {
  width: fit-content;
  font-size: 1vw;
  color: black;
}
.inner {
  display: flex;
  flex-direction: row;
  font-size: 18px;
  text-shadow: 3px black;
}
.info {
  font-size: 14px;
  width: 15vw;
  padding: 2%;
  margin: 0;
  color: gray;
  text-align: left;
  background-color: rgb(255, 255, 255);
}
.name {
  font-size: 20px;
  margin-top: 20px;
  color: black;
  text-align: center;
}
.login_photo {
  width: 1.8em;
}
.button2 {
  margin-left: 0.5em;
  text-align: center;
  width: 14vw;
  border-color: transparent;
  border-radius: 20px;
  margin-top: 1em;
}
.button2:hover {
  background-color: rgb(221, 127, 48);
  color: white;
  border: 1px solid rgb(221, 127, 48);
}

:deep(.slick-slide) {
  text-align: center;
  height: fit-content;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
