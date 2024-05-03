<template>
  <div class="menu-box-area">
    <div class="menu-container">
      <div class="logo">
        <img src="../images/avocado.png" alt="" class="logo-img" />
      </div>
      <div class="menu-item" v-for="(item, index) in menuList" :key="index">
        <div
          class="row"
          :class="{
            active: routerName == item.routerName,
          }"
          @click="
            (e) => {
              onSetMenu(item.routerName);
            }
          "
        >
          <img :src="item.icon" class="menu-icon" v-if="item.icon" />
          <span class="text">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["select"],

  data() {
    return {
      menuList: [],
      menuOpenKeys: [],
    };
  },
  computed: {
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    this.setMenuList();
  },
  methods: {
    onSetMenu(e) {
      if (!e || e.indexOf("__") == 0) {
        if (!e) return;
        if (this.menuOpenKeys.includes(e)) {
          this.menuOpenKeys.splice(this.menuOpenKeys.indexOf(e), 1);
        } else {
          this.menuOpenKeys.push(e);
        }
        return;
      }
      this.$router.push({
        name: e,
      });
      this.$emit("select", 1);
    },
    async setMenuList() {
      let arr = [
        {
          name: "Home",
          routerName: "Admin",
          icon: require("../images/home.png"),
          expand: true,
        },
       
        {
          name: "Table",
          routerName: "Tables",
          icon: require("../images/tables.png"),
          expand: true,
        },
        {
          name: "Reservations",
          routerName: "Reservations",
          icon: require("../images/reserve.png"),
          expand: true,
        }, 
        {
          name: "Menu",
          routerName: "MenuList",
          icon: require("../images/menu.png"),
          expand: true,
        },
         {
          name: "Order",
          routerName: "Order",
          icon: require("../images/order.png"),
          expand: true,
        },
        {
          name: "Banner",
          routerName: "Banner",
          icon: require("../images/banner.png"),
          expand: true,
        }, 
       
        {
          name: "Reviews",
          routerName: "ReviewsList",
          icon: require("../images/star.png"),
          expand: true,
        },
        {
          name: "Profile",
          routerName: "Profile",
          icon: require("../images/profile2.png"),
          expand: true,
        },
      ];
      this.menuList = JSON.parse(JSON.stringify(arr));
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-box-area {
  .menu-container {
    overflow-y: auto;
    position: relative;
    height: 100vh;
    box-sizing: border-box;
    background-color: #fff;

    .logo {
      padding: 22px 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo-img {
        width: 50px;
        height: 50px;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;

      .row {
        box-sizing: border-box;
        width: 40%;
        transition: all 0.2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px;
        width: 70%;

        &:hover {
          // background-color: #f4f4f4;
          background-color: #f8e5d5;
          border-radius: 10px;
        }

        .text {
          height: 100%;
          cursor: pointer;
          white-space: ellipsis;
          color: #dd7f30;
        }
      }

      .menu-icon {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>