<template>
  <div>
    <a-config-provider :locale="locale" size="default">
      <router-view></router-view>
    </a-config-provider>
    <div class="loading-mask" v-if="isLoading">
      <a-spin style="margin: auto" size="large" />
    </div>
    <!-- <LoginView /> -->
  </div>
</template>

<script>
import en from "ant-design-vue/es/locale/en_US";
import kz from "ant-design-vue/es/locale/kk_KZ";
import ru from "ant-design-vue/es/locale/ru_RU";
// import LoginView from "./views/LoginView.vue";
export default {
  name: "App",
  components: {
    // LoginView
  },
  computed: {
        isLoading() {
            return this.$store?.isLoading || false
        },
        locale() {
            switch (this.$i18n.locale) {
                case "en":
                    return en
                case "kz":
                    return kz
                case "ru":
                    return ru
            }
            return en
        },
    },
};
</script>

<style></style>
