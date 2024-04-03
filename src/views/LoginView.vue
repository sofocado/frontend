<template>
  <div class="all">
    <div class="login">
      <a-row>
        <a-col :span="13" class="col1">
          <a-form layout="vertical" :model="info" class="form2">
            <a-form-item>
              <h1>Log In</h1>
              <h3>Please Log in to your account</h3>
            </a-form-item>
            <a-form-item
              label="Phone Number"
              name="phoneNumber"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-input
                v-model:value="info.phoneNumber"
                placeholder="Phone number"
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
        <a-col :span="11" class="col">
          <img class="log_im" src="../images/login_img.jpg" alt="" />
          <h1 style="margin-top: 5vh">ReStoLike</h1>
          <h2>Welcome to ReStoLike!!!</h2>
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
          if (res.result_code === 0 && res) {
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
    // onRegister() {
    //   AuthorizationApi("register", this.info)
    //     .then((res) => {
    //       if (res.result_code === 0) {
    //         console.log("Ok");
    //         localStorage.setItem("userInfo", JSON.stringify(res.data));
    //         this.$router.push({ name: "Dashboard" });
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
.all {
  color: black;
  height: 100vh;
  background-color: rgb(37, 31, 77);
}
.login {
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  width: 60vw;
  padding-top: 5%;
  justify-content: center;
}
.col {
  background-color: rgb(123, 102, 255);
  text-align: center;
  height: 80vh;
  color: white;
  padding-top: 17%;
  border-radius: 20px;
  box-shadow: 10px 12px 15px black;

}
.col1 {
  background-color: white;
  text-align: center;
  height: 80vh;
  padding-top: 15%;
  margin-right: -20px;
  border-radius: 20px 0px 0px 20px;
  box-shadow: 0px 12px 15px black;
}
.form2 {
  width: 20vw;
  margin: auto;
}
.button {
  width: 150px;
  background-color: rgb(123, 102, 255);
  border-radius: 20px;
}
.button:hover {
  background-color: rgb(37, 31, 77);
  color: white;
  border: 1px solid black;
}
.log_im {
  width: 20vw;
  height: 20vh;
  border-radius: 20px;
}
</style>
