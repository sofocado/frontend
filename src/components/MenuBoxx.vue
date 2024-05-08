<template>
  <div class="menu-box-area">
    <div class="menu-container">
      <div class="logo">
        <span>Sofocado</span>
      </div>
      <div class="menu-item" v-for="(item, index) in menuList" :key="index">
        <div
          class="row"
          :class="{
            active: routerName == item.routerName && item.children.lenght == 0,
          }"
          @click="
            (e) => {
              onSetMenu(item.routerName);
            }
          "
        >
          <span class="text">{{ getMenuName(item.name) }}</span>
          <span class="flex-1"></span>
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
    langTag() {
      return this.$i18n.locale;
    },
    routerName() {
      return this.$route.name;
    },
  },
  mounted() {
    console.log("------menu------");
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
          name: "Login",
          routerName: "Login",
          expand: true,
        },
        {
          name: "Login",
          routerName: "Login",
          expand: true,
        },
        {
          name: "Login",
          routerName: "Login",
          expand: true,
        },
      ];
      this.menuList = JSON.parse(JSON.stringify(arr));
    },
    getMenuName(menuName) {
      if (menuName.indexOf("l_") >= 0) {
        let arr = menuName.split(" ");
        let str = "";
        arr.forEach((item) => {
          let start = "";
          let end = "";
          if (item.indexOf("(") == 0) {
            start = " (";
          }
          if (item.indexOf(")") > 0) {
            end = ")";
          }
          item = item.replaceAll("(", "");
          item = item.replaceAll(")", "");
          if (item.indexOf("l_") >= 0) {
            if (!str) {
              str = this.$t(item);
            } else {
              str += start + this.$t(item) + end;
            }
          } else {
            if (!str) {
              str = item;
            } else {
              str += start + item + end;
            }
          }
        });
        return str;
      } else {
        return menuName;
      }
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

    .logo {
      border-bottom: 5px solid #000;
      padding: 50px 20px;
    }

    .menu-item {
      display: flex;
      flex-direction: column;
      background-color: green;

      .row {
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        align-items: center;
        transition: all 0.2s;
        white-space: nowrap;

        &:hover {
          transform: translate(5px);
        }

        .flex-1 {
          flex: 1;
        }

        .text {
          height: 100%;
          margin-left: 8px;
          cursor: pointer;
          white-space: ellipsis;
        }
      }
    }
  }
}
</style>
