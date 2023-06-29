import { createApp } from "vue";
import App from "./App.vue";
// reset style sheet
import "@/styles/reset.scss";
// CSS common style sheet
import "@/styles/common.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// font css
import "@/assets/fonts/font.scss";
// element css
import "element-plus/dist/index.css";

// custom element css
import "@/styles/element.scss";
// svg icons
import "virtual:svg-icons-register";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers";
// pinia store
import pinia from "@/stores";
// errorHandler
import errorHandler from "@/utils/errorHandler";

function routerChangeListener(e: any) {
  console.log("e: ", e);
  router.replace(e.path);
}
if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    instance = createApp(App).use(ElementPlus).use(directives).use(router).use(pinia);
    instance.config.errorHandler = errorHandler;
    Object.keys(Icons).forEach(key => {
      instance.component(key, Icons[key as keyof typeof Icons]);
    });
    instance.mount("#vue3-app");
    console.log("vue3子应用加载");
    // const { setUser } = useUserStore();
    // window.$wujie.bus.$on("changeUser", (e: any) => {
    //   setUser(e.user);
    // });
    window.$wujie?.bus.$on("vue3App:router-change", routerChangeListener);
  };
  window.__WUJIE_UNMOUNT = () => {
    instance?.unmount();
  };
  window.__WUJIE.mount();
} else {
  const app = createApp(App);

  app.config.errorHandler = errorHandler;

  // register the element Icons component
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });

  app.use(ElementPlus).use(directives).use(router).use(pinia).mount("#vue3-app");
}
