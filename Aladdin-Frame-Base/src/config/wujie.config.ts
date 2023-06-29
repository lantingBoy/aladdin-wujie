export interface MicroApp {
  name: string;
  url: string;
  activeRule: string;
}

export const viteAppEntry = "http://localhost:8093/";
export const vue3AppEntry = "http://localhost:6001/";
export const apps = [
  {
    name: "viteApp",
    url: viteAppEntry,
    activeRule: "/viteApp"
  },
  {
    name: "vue3App",
    url: vue3AppEntry,
    activeRule: "/vue3App"
  }
];
