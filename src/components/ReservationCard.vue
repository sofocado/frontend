<template>
    <div class="card" style="display: flex; flex-direction: row;">
        <div style="width: 90%">
     <h1 style="font-size: 20px; color: black">Reservation {{ index }}</h1>
      <h2 style="color: black">{{ Username }}</h2>
      <h2>
        No of quests: <span style="color: black"> {{ table }}</span>
      </h2>
      <h2>
        Occasion: <span style="color: black">{{ occasion }}</span>
      </h2>
      <h2>
        Comment: <span style="color: black">{{ message }}</span>
      </h2>
       <h2>
       Reservation Code: <span style="color: black">{{ reservationCode }}</span>
      </h2>

      <h1 style="font-size: 20px; margin-top: 1em">
        {{ convertSecondsToTime(reservationStartTime) }}
      </h1>
      </div>
    <div>
      <button class="button" @click="view">View</button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    index: Number,
    Username: String,
    reservationStartTime: Number,
    table: String,
    message: String,
    occasion: String,
    reservationCode: String
  },
  methods: {
    convertSecondsToTime(seconds) {
      if (typeof seconds !== "number" || seconds < 0) {
        return "Invalid input";
      }
      const time = dayjs.unix(seconds);

      return time.format("DD.MM.YY HH:mm");
    },
    view(){
         this.$router.push({
              name: "Pre-Order",
            });
    }
  },
};
</script>

<style scoped>
.card {
  background-color: white;
  width: 40vw;
  padding: 2em;
  border: 1px solid rgb(221, 127, 48);
  border-radius: 20px;
  margin-bottom: 2em;
  padding-bottom: 0px;
  padding-top: 15px;
}
.button {
  width: 5em;
  background-color: rgb(221, 127, 48);
  border-radius: 10px;
  border: 1px solid black;
  height: 2em;
  color: white;
  position: relative;
  margin-bottom: 3vh;
}
.button:hover {
  background-color: black;
  color: white;
}
</style>

