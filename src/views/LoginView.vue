<template>
  <div class="all">
    <div class="login">
      <a-row>
        <a-col :span="12" class="col1">
          <a-form layout="vertical" :model="info" class="form2">
            <a-form-item>
             <img class="log_im" src="../images/logo_or.png" alt="" />
              <h3>Please Log in to your account</h3>
            </a-form-item>
            <a-form-item
              label="Phone Number"
              name="phoneNumber"
              :rules="[
                { required: true, message: 'Please input your phone number!' },
              ]"
            >
              <a-input class="inputs"
                v-model:value="info.phoneNumber"
                :rules="[{ required: true }]"
              />
            </a-form-item>
            <h2 id="loginMes"></h2>
            <a-form-item
              label="Password"
              name="password"
              :rules="[
                { required: true, message: 'Please input your password!' },
              ]"
            >
              <a-input-password class="inputs"
                v-model:value="info.password"
                :rules="[{ required: true }]"
              />
            </a-form-item>
      
            <a-form-item>
              <a-button
                class="button"
                type="primary"
                html-type="submit"
                @click="onLogin()"
                >Log in</a-button
              >
            </a-form-item>
             <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </a-form>
        </a-col>
        <a-col :span="12" class="col">
          <img class="log_i" src="../images/login.webp" alt="" />
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
        errorMessage: "",
    };
  },
  methods: {
    onLogin() {
      AuthorizationApi("login", this.info)
        .then((res) => {
          if (res.result_code === 0 && res.data.user.rid != null) {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            localStorage.setItem("rid", res.data.user.rid);
            localStorage.setItem("uid", res.data.user.uid);
            this.$router.push({
              name: "Profile",
            });
          } 
          else if (res.result_code === 0 && res.data.user.rid == null) {
            console.log("Ok");
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.$router.push({
              name: "Dashboard",
            });
          } 
          else {
            console.log(res.message);
          }
         
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "Incorrect email or password.";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.all {
  color: black;
  height: 100%;
  background-color: rgb(255, 222, 195);
}
.login {
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  width: 60em;
  padding-top: 5%;
  justify-content: center;
}
.col {
  background-color: rgb(221, 127, 48);
  text-align: center;
  height: 80;
  color: white;
  align-content: center;
  border-radius: 0px 20px 20px 0px;
  box-shadow: 10px 12px 15px black;
}
.col1 {
  background-color: white;
  text-align: center;
  height: 80vh;
  align-content: center;
  margin-right: -20px;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0px 12px 15px black;
}
.form2 {
  width: 20em;
  margin: auto;
}
.button {
  width: 150px;
  background-color:  rgb(221, 127, 48);
  border-radius: 20px;
  padding-bottom: 1em;
}
.button:hover {
  background-color: black;
  color: white;
  border: 1px solid black;
}
.log_im {
  width: 60%;
  height: auto;
  border-radius: 20px;
  margin-bottom: 4%;
}
.log_i{
  width: 25em;
  height: 27em;
  border-radius: 20px;
  margin-bottom: 4%;
}
.inputs .ant-input{
  color: gray;
  height: 5vh;
  background-color: rgb(239, 239, 239);
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
