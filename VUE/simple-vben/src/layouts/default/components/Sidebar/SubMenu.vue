<template>
  <a-sub-menu :key="props.menuInfo.path" v-bind="$attrs">
    <template #title>
      <span>
        <MailOutlined />
        <span>{{ (props.menuInfo.meta &&  props.menuInfo.meta.title) || '1234' }}</span>
      </span>
    </template>
    <template v-for="item in props.menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <PieChartOutlined />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" setup name="SubMenu">
import { defineProps } from "vue";
import { Menu } from "ant-design-vue";

const ASubMenu = Menu.SubMenu;
const AMenuItem = Menu.Item;
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons-vue';
const props = defineProps({
  menuInfo: {
    type: Object,
    default: () => ({}),
  },
});
</script>
