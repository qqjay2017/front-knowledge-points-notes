<template>
  <LayoutSider :collapsed="collapsed" :trigger="null" collapsible>
    <Logo :collapse="collapsed" />
    <Menu
      theme="dark"
      mode="inline"
      :selectedKeys="selectedKeys"
      @update:selectedKeys="changeSelectedKeys"
     
    >
      <template v-for="item in routes" :key="item.path">
        <sub-menu :menuInfo="item" />
      </template>
    </Menu>
  </LayoutSider>
</template>

<script lang="ts" setup>
import { Layout, Menu } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";

import { useStore } from "vuex";
const LayoutSider = Layout.Sider;
const MenuItem = Menu.Item;

import Logo from "./Logo.vue";
import SubMenu from "./SubMenu.vue";

const store = useStore();

const router = useRouter();

const collapsed = computed(() => {
  return !!!store.state.app.sidebar.opened;
});

const selectedKeys = ref<string[]>(['/']);

const defaultSelectedKeys = ref<string[]>([]);
const { fullPath } = useRoute();

// defaultSelectedKeys.value = [fullPath];
 selectedKeys.value = [fullPath]
const changeSelectedKeys = (value: string[]) => {
  selectedKeys.value = value;
  router.push(value[0]);
};

import { routes } from "/@/router/index";


</script>
