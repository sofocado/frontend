<template>
    <div class="home">
        <a-layout :style="{ height: 100 + '%' }">
            <a-layout-sider width="130" :style="{ overflowY: 'auto' }" :trigger="null" >
                <new-menu-box></new-menu-box>
                <!-- <div class="bt-h"></div> -->
            </a-layout-sider>
            <a-layout class="layout-content">
                <a-layout-content class="router-area">
                    <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import NewMenuBox from "@/components/NewMenuBox.vue"

export default {
    components: {
        NewMenuBox,
    },
    data() {
        return {
            
        }
    },
    computed: {
        langTag() {
            return this.$i18n.locale
        },
    },
    methods: {
        setLanguage(e) {
            this.$i18n.locale = e
            localStorage.setItem("currentLang", e)
        },
    },
}
</script>
<style lang="scss" scoped>
.home {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    
    .layout-content {
        overflow-y: hidden;
    }

    .router-area {
        overflow-y: auto;
        padding-left: 4em;
        padding-top: 5em;
        background: #f2f2f2;
        min-height: 280px;
        box-sizing: border-box;
    }
}
</style>