<template>
  <h2>ReStoLike</h2>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 100%; border-radius: 15px; padding-top: 8%"
    mode="vertical"
    @click="handleClick"
  >
    <a-menu-item key="Dashboard">
      <router-link :to="{ name: 'Dashboard' }">
        <span>Add new restaurant</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="Profile">
      <router-link :to="{ name: 'Profile' }">
        <span>Profile Page</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="Reservations">
      <router-link :to="{ name: 'Reservations' }">
        <span>Reservations</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="Notifications">
      <router-link :to="{ name: 'Notifications' }">
        <span>Notifications</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="Pre-Order">
      <router-link :to="{ name: 'Pre-Order' }">
        <span>Pre-Order</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="UpdatePage">
      <router-link :to="{ name: 'UpdatePage' }">
        <span>UpdatePage</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="Chat">
      <router-link :to="{ name: 'Chat' }">
        <span>Chat</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="MenuUpload">
      <router-link :to="{ name: 'MenuUpload' }">
        <span>MenuUpload</span>
      </router-link>
    </a-menu-item>
     <a-menu-item key="MenuList">
      <router-link :to="{ name: 'MenuList' }">
        <span>Menu</span>
      </router-link>
    </a-menu-item>
    <a-menu-item disabled>
    </a-menu-item>
    <a-menu-item key="Settings">
      <router-link :to="{ name: '' }">
        <span>Settings</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="Help & Support">
      <router-link :to="{ name: '' }">
        <span>Help & Support</span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>



<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  components: {},
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
h2 {
  margin: 10%;
  margin-top: 15%;
}
</style>