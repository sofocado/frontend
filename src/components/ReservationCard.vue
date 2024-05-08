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
        {{ $timeFormat(reservationStartTime, 1) }}
      </h1>
      </div>
    <div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    index: Number,
    Username: String,
    reservationStartTime: Number,
    table: String,
    orderId: String,
    message: String,
    occasion: String,
    reservationCode: String
  },
  methods: {
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
  padding-bottom: 0px;
  padding-top: 15px;
}
</style>

