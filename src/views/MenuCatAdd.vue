<template>
    <div>
        
         <a-form-item
              label="Name"
              :rules="[
                { required: true, message: 'Please input your averageCheque!' },
              ]"
            >
              <a-input
                type="Name"
                v-model:value="info.name"
                placeholder="Name"
                :rules="[{ required: true }]"
              />
            </a-form-item>

      <a-button class="button" @click="addCategory()"
        >Send</a-button
      >
    </div>
</template>

<script>
import { MenuCatApi } from "@/api/menuCat";

export default {
   data() {
     return {
        info: {
            name: ""
        }
     }
   },
   methods: {
     addCategory() {
       MenuCatApi("add", this.info).then((res) => {
        if (res.result_code === 0) {
          this.$router.back();
        } else {
          console.log("Error");
        }
      });
     }
   }
}
</script>

<style scoped>
.button {
  width: 150px;
  background-color: rgb(221, 127, 48);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(0, 0, 0);
  color: white;
  border: 1px solid black;
}
</style>