<template>
  <template
    v-if="
      hasOneShowingChild(props.item.children, props.item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !props.item.alwaysShow
    "
  >
    <MenuItem :key="resolvePath(onlyOneChild.path)">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <Item
          :icon="onlyOneChild.meta.icon"
          :title="onlyOneChild.meta.title"
        ></Item>
      </AppLink>
    </MenuItem>
  </template>

  <SubMenu v-else :key="resolvePath(props.item.path)">
    <template #title>
      <Item
        v-if="item.meta"
        :icon="item.meta && item.meta.icon"
        :title="item.meta.title"
      ></Item>
    </template>
    <SidebarItem
      v-for="child in props.item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    >
    </SidebarItem>
  </SubMenu>
</template>

<script setup name="SidebarItem" lang="ts">
import { Menu } from "ant-design-vue";
import { defineComponent, defineProps, ref } from "vue";
import { isExternal } from "/@/utils/validate";
import path from "path-browserify";
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

import AppLink from "./Link.vue";
import Item from "./Item.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

let onlyOneChild = ref<Record<string, any>>({
  path: "",
  children: [],
});

const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((_item: any) => {
    if (_item.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = _item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  return path.resolve(props.basePath, routePath);
};
</script>
