<template>
    <div class="all">
        <h2 style="color: black; font-size: 20px">Order # {{orderId}}</h2>
    </div>
</template>


<script>

export default {
data() {
    return {
      orderId: this.$route.query.orderId
    };
  },
}


</script>

<style scoped>
.all{
    background-color: white;
    height: fit-content;
    width: 30vw;
    border: 1px solid rgb(221, 127, 48);
    border-radius: 20px;
    padding: 2vw;
    position: fixed;
}
</style>