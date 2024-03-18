<template>
  <div class="all">
    <div class="login">
      <a-row>
        <a-col :span="11" class="col">
          <h1>"Logo"</h1>
          <h1>ReStoLike</h1>
          <h2>Welcome to ReStoLike!!!</h2>
          <h3>Please Log in to your account</h3>
        </a-col>
        <a-col :span="2" class="col2"> </a-col>
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
.all {
  color: black;
  height: 100vh;
  background-color: rgb(41, 75, 41);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.login {
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  padding-top: 10%;
  justify-content: center;
}
.col {
  background-color: white;
  text-align: center;
  height: 60vh;
  padding-top: 10%;
  border: 1px solid rgb(163, 163, 163);
  border-radius: 20px;
  box-shadow: 2px 2px rgb(163, 163, 163);
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
.form2 {
  width: 300px;
  margin: auto;
}
.button {
  width: 150px;
  background-color: black;
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(210, 210, 210);
  color: black;
  border: 1px solid black;
}
</style>
