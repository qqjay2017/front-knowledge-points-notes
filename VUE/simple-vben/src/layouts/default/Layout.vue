<template>
  <Layout>
    <Sidebar />
    <Layout>
      <LayoutHeader />
      <Layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <AppMain />
      </Layout-content>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { Layout } from "ant-design-vue";
import { ref } from "vue";
import LayoutHeader from "./components/NavBar.vue";
import AppMain from "./components/AppMain.vue";
import Sidebar from "./components/Sidebar/Sidebar.vue";
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
