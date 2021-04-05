<template>
  <Sider v-model:collapsed="isCollapse" :trigger="null" collapsible>
    <Logo v-if="showLogo" :collapse="isCollapse" />
    {{ isCollapse }}
    <Menu
      v-model:selectedKeys="selectedKeys"
      :inline-collapsed="isCollapse"
      mode="inline"
      theme="dark"
      :sub-menu-open-delay="0.2"
    >
      <template v-for="r in routes" :key="r.path">
        <SidebarItem :item="r" :base-path="r.path" />
      </template>
    </Menu>
  </Sider>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Menu, Layout } from "ant-design-vue";
const Sider = Layout.Sider;

import SidebarItem from "./SidebarItem.vue";
import Logo from "./Logo.vue";

const store = useStore();

const showLogo = computed(() => {
  return store.state.settings.sidebarLogo;
});

const route = useRoute();
const router = useRouter();

const selectedKeys = ref<string[]>([route.path]);

const openKeys = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return [meta.activeMenu];
  }
  return [path];
});

const routes = computed(() => {
  return router.options.routes;
});

const isCollapse = computed(() => {
  return !store.state.app.sidebar.opened;
});
</script>
