<template>
  <div class="admin">
    <div class="adminDiv">
      <a-row>
        <a-col :span="5" class="Menu"><MenuBox /></a-col>
        <!-- <a-col :span="1"></a-col> -->
        <a-col :span="18" class="Box">
          <div class="header">
            <!-- <h2>{{ $route.params.phoneNumber }}</h2> -->
            <a-button type="link" style="color: black">
              <router-link :to="{ name: 'Notifications' }">
                <BellOutlined style="font-size: 170%" />
              </router-link></a-button
            >
          </div>
          <router-view class="content"></router-view>
        </a-col>
      </a-row>
    </div>
  </div>
</template>



<script>
import { defineComponent, reactive, toRefs } from "vue";
import MenuBox from "@/components/MenuBox.vue";
import { BellOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    MenuBox,
    BellOutlined,
  },
  setup() {
    const state = reactive({
      selectedKeys: [],
      openKeys: [],
    });
    const handleClick = (menuInfo) => {
      console.log("click ", menuInfo);
    };
    return {
      ...toRefs(state),
      handleClick,
    };
  },
});
</script>

<style scoped>
.admin {
  background-color: #f1f1f1;
  /* min-height: 100vh; */
  /* overflow-y: scroll; */
}
.adminDiv {
  /* margin: auto; */
  /* padding-top: 5%; */
  /* width: 80vw; */
}
.Menu {
  background-color: white;
  border-radius: 15px;
  height: 80vh;
}
.Box {
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  align-items: stretch;
  height: 80vh;
}
.header {
  display: flex;
  flex-direction: row;
  gap: 82%;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  width: 100%;
  padding-bottom: 2%;
  padding-top: 2.8%;
  padding-left: 4%;
}
.content {
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  padding: 4%;
  height: fit-content;
  margin-top: 2.5%;
}
</style>