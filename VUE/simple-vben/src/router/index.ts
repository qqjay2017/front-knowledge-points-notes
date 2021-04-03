import { createRouter, createWebHashHistory } from "vue-router";
import component from "/@/layouts/default/index.vue";
import Layout from "/@/layouts/default/index.vue";
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
      children: [
        {
          path: "index",
          component: () => import("/@/views/about/index.vue"),
          name: "Documentation",
          meta: { title: "Documentation", icon: "documentation", affix: true },
        },
      ],
    },
  ],
});

export default router;
