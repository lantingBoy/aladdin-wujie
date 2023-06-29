import { defineStore } from "pinia";
import { apps as microApps, type MicroApp } from "@/config/wujie.config";
import { computed, reactive } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const apps = reactive<MicroApp[]>(microApps);
  const paths = computed(() => apps.map(item => item.activeRule));
  return { apps, paths };
});
