import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "/@/layouts/default/Layout.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          component: () => import("/@/views/dashboard/Dashboard.vue"),
          name: "Dashboard",
          meta: { title: "Dashboard", icon: "dashboard", affix: true },
        },
      ],
    },
    {
      path: "/about",
      component: Layout,
      meta: { title: "About", icon: "el-icon-s-help" },
      children: [
        {
          path: "index",
          component: () => import("/@/views/about/About.vue"),
          name: "Documentation",
          meta: { title: "Documentation", icon: "example", affix: true },
        },
        {
          path: "index2",
          component: () => import("/@/views/about/About.vue"),
          name: "Documentation2",
          meta: { title: "Documentation2", icon: "example", affix: true },
        },
      ],
    },
  ],
});

export default router;
