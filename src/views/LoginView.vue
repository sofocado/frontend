<template>
  <div class="login">
    <input type="text" placeholder="Username" v-model="info.username" />
    <input type="password" placeholder="Password" v-model="info.password" />

    <button @click="onLogin()">Sign In</button>
  </div>
</template>

<script>
import { AuthorizationApi } from "@/api/auth";
export default {
  data() {
    return {
      info: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onLogin() {
      AuthorizationApi("login", this.info)
        .then((res) => {
          if (res.result_code === 0) {
            console.log("Ok");
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$router.push({ name: "Dashboard" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
