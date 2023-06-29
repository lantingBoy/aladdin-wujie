<template>
  <Maximize v-if="maximize" />
  <Tabs v-if="tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
    <wujie-vue
      v-if="microApp"
      :name="microApp.name"
      :url="microApp.url"
      :props="microAppProps"
      :after-mount="afterMount"
      width="100%"
      height="100%"
    />
  </el-main>
  <el-footer v-if="footer">
    <Footer />
  </el-footer>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, provide, watch, computed, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

import WujieVue from "wujie-vue3";
import { useDebounceFn } from "@vueuse/core";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useAppStore } from "@/stores/modules/wujie";

import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";

const globalStore = useGlobalStore();
const { maximize, isCollapse, layout, tabs, footer } = storeToRefs(globalStore);

const keepAliveStore = useKeepAliveStore();
const { keepAliveName } = storeToRefs(keepAliveStore);
const { apps } = storeToRefs(useAppStore());
const routes = useRoute();
const router = useRouter();
// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);
const microAppProps = computed(() => ({ router }));
const microData = computed(() => ({
  user: { name: "test" }
}));
const microApp = computed(() => {
  const app = apps.value.find(item => routes.path.startsWith(item.activeRule));
  if (app) {
    return {
      ...app,
      url: `${app.url}#${routes.fullPath}`
    };
  }
  return null;
});
console.log("microApp=>>>>>", microApp.value);
const { bus } = WujieVue;

function afterMount() {
  if (microApp.value) {
    // 解决首次加载路由跳转地址错误问题
    bus.$emit(`${microApp.value.name}:router-change`, {
      path: routes.fullPath,
      replace: true
    });
  }
  bus.$emit("changeUser", toRaw(microData.value));
}
watch(routes, val => {
  console.log("val: ", val.fullPath);
  if (microApp.value) {
    bus.$emit(`${microApp.value.name}:router-change`, {
      path: val.fullPath,
      replace: false
    });
  }
});

// 监听当前页面是否最大化，动态添加 class
watch(
  () => maximize.value,
  () => {
    const app = document.getElementById("app") as HTMLElement;
    if (maximize.value) app.classList.add("main-maximize");
    else app.classList.remove("main-maximize");
  },
  { immediate: true }
);

// 监听布局变化，在 body 上添加相对应的 layout class
watch(
  () => layout.value,
  () => {
    const body = document.body as HTMLElement;
    body.setAttribute("class", layout.value);
  },
  { immediate: true }
);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!isCollapse.value && screenWidth.value < 1200) globalStore.setGlobalState("isCollapse", true);
  if (isCollapse.value && screenWidth.value > 1200) globalStore.setGlobalState("isCollapse", false);
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
