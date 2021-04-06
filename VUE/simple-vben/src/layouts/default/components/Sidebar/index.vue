<template>
  <LayoutSider :collapsed="collapsed" :trigger="null" collapsible>
    <Logo :collapse="collapsed" />
    <Menu
      theme="dark"
      mode="inline"
      :selectedKeys="selectedKeys"
      :default-selected-keys="defaultSelectedKeys"
      @update:selectedKeys="changeSelectedKeys"
    >
    <template v-for="item in routes" :key="item.path">
           <sub-menu :menuInfo="item"  />
    </template>
    </Menu>
  </LayoutSider>
</template>

<script lang="ts" setup>
import { Layout, Menu } from "ant-design-vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

import { useStore } from "vuex";
const LayoutSider = Layout.Sider;
const MenuItem = Menu.Item;

import Logo from "./Logo.vue";
import SubMenu from './SubMenu.vue'

const store = useStore();

const collapsed = computed(() => {
  return !!!store.state.app.sidebar.opened;
});

const selectedKeys = ref<string[]>(["1"]);

const defaultSelectedKeys = ref<string[]>([]);
const { fullPath } = useRoute()

defaultSelectedKeys.value = [fullPath]

const changeSelectedKeys = (value: string[]) => {
  console.log(value);
};

import {routes} from '/@/router/index'
console.log(routes)
</script>
