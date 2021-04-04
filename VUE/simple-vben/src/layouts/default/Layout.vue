<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavBar />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AppMain from "./components/AppMain.vue";
import NavBar from "./components/NavBar.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
import { Layout } from "ant-design-vue";
// import LayoutHeader from "./header/index.vue";

import { useStore } from "vuex";
const store = useStore();

const sidebar = computed(() => {
  return store.state.app.sidebar;
});

const device = computed(() => {
  return store.state.app.device;
});

const fixedHeader = computed(() => {
  return store.state.settings.fixedHeader;
});

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === "mobile",
  };
});
</script>

<style lang="less" scoped>
@import "/@/design/variables.less";

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - @sideBarWidth);
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
