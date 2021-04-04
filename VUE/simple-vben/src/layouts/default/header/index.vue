<template>
  <Header class="vben-layout-header">
    <div class="header-left">1</div>
    <div class="header-right">2</div>
  </Header>
</template>

<script setup lang="ts">
import { Layout } from "ant-design-vue";
import { useStore } from "vuex";
const store = useStore();
console.log(store);
const Header = Layout.Header;
</script>
