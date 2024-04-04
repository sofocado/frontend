<template>
  <div class="all">
    <div class="login">
      <a-row>
        <a-col :span="11" class="col">
          <a-form layout="vertical" :model="info" class="form2">
            <a-form-item>
              <h1>Log In</h1>
            </a-form-item>
            <a-form-item
              label="Restaurant name"
              name="username"
              :rules="[
                { required: true, message: 'Please input your username!' },
              ]"
            >
              <a-input
                v-model:value="info.phoneNumber"
                placeholder="Username"
                :rules="[{ required: true }]"
              />
            </a-form-item>
            <a-form-item
              label="Password"
              name="password"
              :rules="[
                { required: true, message: 'Please input your password!' },
              ]"
            >
              <a-input-password
                v-model:value="info.password"
                placeholder="Password"
                :rules="[{ required: true }]"
              />
            </a-form-item>

            <a-form-item>
              <a-button
                class="button"
                type="primary"
                html-type="submit"
                @click="onLogin()"
                >Log In</a-button
              >
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
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
            this.$router.push({
              name: "Admin",
            });
          } else {
            console.log(res.message);
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
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
