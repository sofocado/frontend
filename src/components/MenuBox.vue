<template >
<div style="width: 100%">
    <img class="avo" src="../images/avocado.png" alt="" />
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 100%; padding-top: 5%;"
    mode="vertical"
    @click="handleClick"
  >
   <a-menu-item key="Home" class="menuitem" style="display: flex; flex-direction: column; height: 4em; text-align: center;"> 
    <div style="display: flex; flex-direction: column;">
      <img class="home" src="../images/home.png" alt="" />
        <span>Home</span> 
        </div>
         <router-link :to="{ name: 'Profile' }">
      </router-link>
    </a-menu-item>

    <a-menu-item key="Table" class="menuitem" style="display: flex; flex-direction: column; height: 4em; text-align: center;"> 
    <div style="display: flex; flex-direction: column;">
      <img class="home" src="../images/tables.png" alt="" />
        <span>Table</span> 
        </div>
         <router-link :to="{ name: 'Tables' }">
      </router-link>
    </a-menu-item>
 
    <a-menu-item key="Resevations" class="menuitem" style="display: flex; flex-direction: column; height: 4em; text-align: center;"> 
    <div style="display: flex; flex-direction: column;">
      <img class="home" src="../images/reserve.png" alt="" />
        <span style="margin-left: -1em">Reservations</span> 
        </div>
      <router-link :to="{ name: 'Reservations' }">
      </router-link>
    </a-menu-item>
       <a-menu-item key="Banner" class="menuitem" style="display: flex; flex-direction: column; height: 4em; text-align: center;"> 
    <div style="display: flex; flex-direction: column;">
      <img class="home" src="../images/banner.png" alt="" />
        <span>Banner</span> 
        </div>
      <router-link :to="{ name: 'Banner' }">
      </router-link>
    </a-menu-item>
     <a-menu-item key="Profile" class="menuitem" style="display: flex; flex-direction: column; height: 4em; text-align: center;"> 
    <div style="display: flex; flex-direction: column;">
      <img class="home" src="../images/menu.png" alt="" />
        <span>Menu</span> 
        </div>
      <router-link :to="{ name: 'MenuList' }">
      </router-link>
    </a-menu-item>
      <a-menu-item key="Reviews" class="menuitem" style="display: flex; flex-direction: column; height: 4em; text-align: center;"> 
    <div style="display: flex; flex-direction: column;">
      <img class="home" src="../images/star.png" alt="" />
        <span>Reviews</span> 
        </div>
      <router-link :to="{ name: 'ReviewsList' }">
      </router-link>
    </a-menu-item>
    <a-menu-item disabled>
    </a-menu-item>
      <a-menu-item key="Profile" class="menuitem" style="display: flex; flex-direction: column; height: 4em; text-align: center;"> 
    <div style="display: flex; flex-direction: column;">
      <img class="home" src="../images/profile.png" alt="" />
        <span>Profile</span> 
        </div>
      <router-link :to="{ name: 'Profile' }">
      </router-link>
    </a-menu-item>
  </a-menu>
  </div>
</template>



<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  components: {},
  methods: {
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

.avo {
  width: 3em;
  height: 3em;
  margin-left: 25%;
  margin-top: 30%;
}
.home{
  width: 2em;
  height: 2em;
  margin-left: 1em;
}
</style>