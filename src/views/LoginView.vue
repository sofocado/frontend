<template>
  <div class="login">
    <a-form layout="vertical" :model="info">
      <a-form-item label="Username">
        <a-input v-model:value="info.phoneNumber" placeholder="Username" :rules="[{ required: true }]" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input-password v-model:value="info.password" placeholder="Password" :rules="[{ required: true }]" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="onLogin()">Sign In</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="onRegister()">Register</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { AuthorizationApi } from "@/api/auth";
export default {
  data() {
    return {
      info: {
        phoneNumber: "",
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
    onRegister() {
      AuthorizationApi("register", this.info)
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
    }
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 30px;
}
</style>
