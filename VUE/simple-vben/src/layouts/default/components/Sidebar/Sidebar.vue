<template>
  <div :class="{ 'has-logo': showLogo }">
    {{ showLogo }}
    <div>
      <Menu mode="inline">
        <SidebarItem
          v-for="r in routes"
          :key="r.path"
          :item="r"
          :base-path="r.path"
        />
      </Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { Menu } from "ant-design-vue";
import SidebarItem from "./SidebarItem.vue";

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
</script>
