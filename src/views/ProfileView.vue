<template>
  <div>
    <div class="all">
      <div class="inner">
        <h1 class="name">{{ userInfo.name }}</h1>
        <h6>{{ userInfo.description }}</h6>
        <div class="Array">
          <div class="grid-container">
            <div class="grid-item">
              <div class="info">Address: {{ userInfo.address }}</div>
            </div>
            <div class="grid-item">
              <div class="info">
                <!-- Work time: {{ userInfo.workendtime }} -
                {{ userInfo.workstarttime }} -->
               Work time: 9:00-23:00
              </div>
            </div>
            <div class="grid-item">
              <div class="info">Categories: {{ userInfo.category }}</div>
            </div>
            <div class="grid-item">
              <div class="info">Count of tables: {{ userInfo.countTable }}</div>
            </div>
            <div class="grid-item">
              <div class="info">Parking: {{ park() }}</div>
            </div>
            <div class="grid-item">
              <div class="info">Average cheque: {{ userInfo.avgCheque }}</div>
            </div>
            <div class="grid-item">
              <div class="info">Praying room: {{ pray() }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="photo-back">
        <img
          :src="'http://localhost:2002/' + userInfo.path"
          alt=""
          class="photo"
        />
      </div>
    </div>

    <a-button class="button" @click="editProfile()">Edit</a-button>
  </div>
</template>

<script>
import { RestaurantApi } from "@/api/restaurant";
import dayjs from "dayjs";

export default {
  data() {
    return {
      userInfo: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      const rid = this.$route.query.rid;
      RestaurantApi("get", { rid }).then((res) => {
        if (res.result_code === 0) {
          this.userInfo = JSON.parse(JSON.stringify(res.data));
          this.userInfo.workstarttime = dayjs(this.userInfo.workstarttime);
          this.userInfo.workendtime = dayjs(this.userInfo.workendime);
        } else {
          console.log("Error");
        }
      });
    },
    park(){
      if (this.userInfo.parking == 1){
        return "Yes"
      } 
    },
     pray(){
      if (this.userInfo.prayingRoom == 1){
        return "Yes"
      } 
    },
    editProfile() {
      this.$router.push({
        name: "UpdateProfilePage",
        query: {
          rid: this.$route.query.rid,
        },
      });
    },
  },
};
</script>

<style lang="scss">
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
.photo-back {
  width: 20vw;
  height: 35vh;
  overflow: visible;
  border-radius: 20px;
}
.photo {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 30px;
}
.name {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.all {
  display: flex;
  flex-direction: row;
}
.inner {
  width: 35vw;
  font-size: 18px;
  text-shadow: 3px black;
}
.info {
  font-size: 14px;
  width: 15vw;
  padding: 2%;
  margin: 2%;
  border: 1px solid gray;
  border-radius: 20px;
  color: black;
  text-align: center;
  background-color: rgb(255, 255, 255);
}
.Array {
  display: grid;
}
.grid-container {
  display: grid;
  grid-template-columns: 15vw 15vw;
  background-color: #ffffff; 
}

</style>
