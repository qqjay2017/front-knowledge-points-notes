<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    {{ isCollapse }}
    <Menu
      :inline-collapsed="isCollapse"
      mode="inline"
      theme="dark"
      :sub-menu-open-delay="0.2"
    >
      <template v-for="r in routes" :key="r.path">
        <SidebarItem :item="r" :base-path="r.path" />
      </template>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Menu } from "ant-design-vue";
import SidebarItem from "./SidebarItem.vue";
import Logo from "./Logo.vue";

const store = useStore();

const showLogo = computed(() => {
  return store.state.settings.sidebarLogo;
});

const route = useRoute();
const router = useRouter();

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
