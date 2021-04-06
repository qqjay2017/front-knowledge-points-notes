<template>
  <a-menu-item
    :key="onlyOneChild.path"
    v-if="hasChildren && hasChildren == 1"
  >
    <PieChartOutlined />
    <span>{{ onlyOneChild.path }}</span>
  </a-menu-item>
  <a-sub-menu
    :key="props.menuInfo.path"
    v-bind="$attrs"
    v-if="hasChildren && hasChildren > 1"
  >
    <template #title>
      <span>
        <MailOutlined />
        <span>{{
         props.menuInfo.path
        }}</span>
      </span>
    </template>
    <template v-for="item in props.menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <PieChartOutlined />
          <span>{{ item.path }}</span>
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" setup name="SubMenu">
import { computed, defineProps } from "vue";
import { Menu } from "ant-design-vue";

const ASubMenu = Menu.SubMenu;
const AMenuItem = Menu.Item;
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons-vue";
const props = defineProps({
  menuInfo: {
    type: Object,
    default: () => ({}),
  },
});

const hasChildren = computed(()=>{
  if(!props.menuInfo.children || props.menuInfo.children.length == 0 ){
    return false
  }
  return  props.menuInfo.children.length 
})

const onlyOneChild = computed(()=>{
  if(!props.menuInfo.children || props.menuInfo.children.length == 0 ){
    return false
  }
  return props.menuInfo.children[0]
})

</script>
