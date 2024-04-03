<template>
  <div>
    <label for="">Item Name</label>
    <a-input
      v-model:value="info.itemName"
      placeholder="itemName"
     :rules="[{ required: true }]" 
     
    />
    <br />
    <br />
     <label for="">Description</label>
    <a-textarea
      v-model:value="info.description"
      placeholder="Description"
      :rules="[{ required: true }]"
    />
     <br />
    <br />
     <label for="">Price</label>
     <a-input
      v-model:value="info.price"
      placeholder="Price"
      :rules="[{ required: true }]"
    />
     <br />
    <br />
     <label for="">Price with discount</label>
     <a-input
      v-model:value="info.disPrice"
      placeholder="Price with discount"
     :rules="[{ required: true }]"
    />
     <br />
    <br />
    <a-button
      class="button"
      type="primary"
      html-type="submit"
      @click="onAdd()"
      >Add</a-button
    >
  </div>
</template>

<script>
import { MenuApi } from "@/api/menu";
export default {
  data() {
    return {
      info: {
        itemName: "",
        description: "",
        price: 0,
        disPrice: 0,
      },
    };
  },
  methods: {
    onAdd() {
      console.log(this.info)
      MenuApi("add", this.info, "POST")
        .then((res) => {
          if (res.message === "Menu added successfully") {
        console.log("Ok");
           this.$router.push({ name: "MenuList"});
          }
          else{
             console.log(res.message)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
