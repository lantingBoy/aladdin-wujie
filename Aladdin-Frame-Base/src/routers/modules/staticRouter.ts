import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config";
import WuJie from "@/components/WuJIe/index.vue";

const NEW_APP = {
  path: "/newApp",
  name: "newApp",
  component: null,
  meta: {
    icon: "HomeFilled",
    title: "newApp子应用"
  },
  children: [
    {
      path: "/newApp/home",
      name: "homes",
      component: WuJie,
      meta: {
        icon: "HomeFilled",
        title: "测试1",
        isKeepAlive: true
      }
    },
    {
      path: "/newApp/dialog",
      name: "dialog",
      component: WuJie,
      meta: {
        icon: "HomeFilled",
        title: "测试2",
        isKeepAlive: false
      }
    }
  ]
};
/**
 * Vue3-vite子应用路由
 */
const SUBAPP_VUE3 = {
  path: "/vue3App",
  name: "vue3",
  component: null,
  meta: {
    icon: "HomeFilled",
    title: "Vue3子应用"
  },
  children: [
    {
      path: "/vue3App/home/index",
      name: "homes1",
      component: WuJie,
      meta: {
        icon: "HomeFilled",
        title: "v3-首页",
        isKeepAlive: false
      }
    },
    {
      path: "/vue3App/test",
      name: "test",
      component: WuJie,
      meta: {
        icon: "HomeFilled",
        title: "v3-菜单1",
        isKeepAlive: false
      }
    },
    {
      path: "/vue3App/sub/about",
      name: "about",
      component: WuJie,
      meta: {
        icon: "HomeFilled",
        title: "vue3about",
        isKeepAlive: false
      }
    }
  ]
};

/**
 * VITE子应用路由
 */
const SUBAPP_VITE = {
  path: "/viteApp",
  name: "vite",
  component: null,
  meta: {
    icon: "HomeFilled",
    title: "Vite子应用"
  },
  children: [
    {
      path: "/viteApp/communication-test",
      name: "menu1",
      component: WuJie,
      meta: {
        icon: "HomeFilled",
        title: "子菜单1",
        isKeepAlive: true
      }
    },
    {
      path: "/viteApp/navigate-view",
      name: "menu2",
      component: WuJie,
      meta: {
        icon: "HomeFilled",
        title: "子菜单",
        isKeepAlive: false
      }
    }
  ]
};
/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    redirect: HOME_URL,
    children: [
      {
        path: "/home/index",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          icon: "HomeFilled",
          title: "首页",
          isFull: false,
          isAffix: true
        }
      },
      SUBAPP_VITE,
      SUBAPP_VUE3,
      NEW_APP
    ]
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];
