<template>
 <div class="loader" v-if="loading">
    <a-spin />
  </div>
  <div class="over">
    <div class="all">
      <a-modal
        v-model:visible="modalVisible"
        title="Edit"
        style="
          height: fit-content;
          border-radius: 10px;
          width: 35em;
        "
        :footer="null"
      >
        <div>
          <MenuEdit
          @exit="close"
            :name="name"
            :menuId="menuId"
            :ingredient="ingredient"
            :category="category"
            :path="path"
            :price="price"
          />
        </div>
    
      </a-modal>

      <a-card hoverable class="card" @click="deleteMenu()">
        <div>
          <img :src="path" alt="" class="photo" />
        </div>
        <div class="name">
          {{ name }}
        </div>
        <div class="desc">
          {{ ingredient }}
        </div>

        <div class="price">
          <h2>{{ price }} ₸</h2>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import MenuEdit from "@/components/MenuEdit.vue";

export default {
  components: {
    MenuEdit,
  },
  data() {
    return {
      modalVisible: false,
    };
  },
  props: {
    name: String,
    ingredient: String,
    path: String,
    category: String,
    menuId: String,
    price: Number,
  },
  methods: {
    handleCancel() {
      this.modalVisible = false;
    },
    close(){
      this.modalVisible = false;
      this.$emit('load', true)
    },
    deleteMenu() {
      this.modalVisible = true;
    },
  },
};
</script>

<style scoped>
.all {
  padding-top: 1%;
  width: 100%;
  height: 18em;
  margin-bottom: 20%;
}
.name {
  width: 10.5em;
  height: 1em;
  position: relative;
  top: -5em;
  text-align: center;
  white-space: wrap;
  font-size: 16px;
}
.desc {
  position: relative;
  top: -3em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 11em;
}
.price {
  height: 20%;
  margin-left: 15%;
  text-align: center;
  padding-top: 2%;
  border-radius: 30px 30px 0 0;
  border: 1px solid rgb(200, 200, 200);
  margin-bottom: -3.9em;
  width: 70%;
  position: relative;
  background-color: rgb(221, 127, 48);
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
  height: 9em;
  object-fit: cover;
  position: relative;
  top: -6.5em;
  display: block;
}
.over {
  height: fit-content;
}
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); 
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>