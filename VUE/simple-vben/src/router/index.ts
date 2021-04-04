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
          component: () => import("/@/views/dashboard/index.vue"),
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
          component: () => import("/@/views/about/index.vue"),
          name: "Documentation",
          meta: { title: "Documentation", icon: "documentation", affix: true },
        },
        {
          path: "index2",
          component: () => import("/@/views/about/index.vue"),
          name: "Documentation2",
          meta: { title: "Documentation2", icon: "documentation", affix: true },
        },
      ],
    },
  ],
});

export default router;
