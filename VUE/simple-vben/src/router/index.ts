import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    component: () => import("/@/views/about/About.vue"),
    // children: [
    //   {
    //     path: "/dashboard",
    //     component: () => import("/@/views/dashboard/Dashboard.vue"),
    //     name: "Dashboard",
    //     meta: { title: "Dashboard", icon: "dashboard", affix: true },
    //   },
    // ],
  },
  // {
  //   path: "/about",
  //   component: Layout,
  //   meta: { title: "About", icon: "el-icon-s-help" },
  //   children: [
  //     {
  //       path: "/about/index",
  //       component: () => import("/@/views/about/About.vue"),
  //       name: "Documentation",
  //       meta: { title: "Documentation", icon: "example", affix: true },
  //     },
  //     {
  //       path: "/about/index2",
  //       component: () => import("/@/views/about/About.vue"),
  //       name: "Documentation2",
  //       meta: { title: "Documentation2", icon: "example", affix: true },
  //     },
  //   ],
  // },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
