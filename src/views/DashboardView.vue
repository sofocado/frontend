<template>
  <div class="dashboard">
    <h2>Add Restaurant</h2>
    <form @submit.prevent="onAddRestaurant">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="restaurant.name" required /><br />

      <label for="description">Description:</label>
      <input
        type="text"
        id="description"
        v-model="restaurant.description"
      /><br />

      <label for="address">Address:</label>
      <input type="text" id="address" v-model="restaurant.address" /><br />

      <label for="startTime">Start Time:</label>
      <input
        type="number"
        id="startTime"
        v-model="restaurant.startTime"
      /><br />

      <label for="endTime">End Time:</label>
      <input type="number" id="endTime" v-model="restaurant.endTime" /><br />

      <label for="countTable">Count Table:</label>
      <input
        type="number"
        id="countTable"
        v-model="restaurant.countTable"
      /><br />

      <button type="submit">Add Restaurant</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurant: {
        name: "",
        description: "",
        address: "",
        startTime: 0,
        endTime: 0,
        countTable: 0,
      },
      errorMessage: "",
    };
  },
  methods: {
    async onAddRestaurant() {
      try {
        const response = await fetch("http://localhost:1001/restaurant/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.restaurant),
        });

        if (response.ok) {
          console.log("Restaurant added successfully.");
          // Дополнительные действия при успешном добавлении ресторана
        } else {
          const errorData = await response.json();
          this.errorMessage = errorData.message;
        }
      } catch (error) {
        console.error("Error:", error);
        this.errorMessage = "An error occurred. Please try again later.";
      }
    },
  },
};
</script>

<style scoped></style>
