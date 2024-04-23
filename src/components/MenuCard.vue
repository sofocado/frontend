<template>
<div class="over">
  <div class="all">
    <a-card hoverable class="card">
      <div>
        <img :src="'http://172.20.10.9:2002/' + image" alt="" class="photo" />
      </div>
      <div class="name">
         {{ name }}
      </div>
      <div class="desc">
         {{ description }}
      </div>

      <div class="price">
        <h2>{{ price }} TG</h2>
      </div>
    </a-card>
  </div>
  </div>
</template>

<script>

export default {
    data() {
    return {
      modalVisible: false,
    };
  },
  props: {
    name: String,
    description: String,
    image: String,
    price: Number,
  },
  methods: {
    handleCancel() {
      this.modalVisible = false
    },
  },
  }
</script>

<style scoped>
.all {
  padding-top: 1%;
  width: 100%;
  height: 18em;
  margin-bottom: 20%;
}
.name {
  width: 10em;
  height: 2em;
  position: relative;
  top: -4em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}
.desc {
  position: relative;
  top: -3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 10em;
}
.price {
  height: 20%;
  margin-left: 15%;
  text-align: center;
  padding-top: 2%;
  border-radius: 30px 30px 0 0;
  border: 1px solid rgb(200, 200, 200);
  margin-bottom: -6.1em;
  width: 70%;
  position: relative;
  bottom: 0.5em;
  background-color: rgb(255, 222, 195);
}
.card {
  align-content: center;
  height: 100%;
  width: 100%;
  border-radius: 30px;
}
.photo {
  /* margin-top: -7em; */
  width: 100%;
  border: 1px solid rgb(221, 127, 48);
  border-radius: 30px;
  height: 100px;
  object-fit: cover;
  position: relative;
  top: -6.5em;
  display: block;
}
.over{
  height: fit-content;
}
</style>