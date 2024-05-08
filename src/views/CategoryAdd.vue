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

      <a-button class="button" type="primary" @click="addCategory()"
        >Send</a-button
      >
    </div>
</template>

<script>
import { CategoryApi } from "@/api/category";

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
       CategoryApi("add", this.info).then((res) => {
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
