<template>
     <layout-sider :collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <Menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </menu-item>
        <menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </menu-item>
        <menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </menu-item>
      </Menu>
    </layout-sider>
</template>

<script lang="ts" setup>
import { Layout ,Menu} from 'ant-design-vue'
import {computed, ref} from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { useStore } from 'vuex';
const LayoutSider = Layout.Sider
const MenuItem = Menu.Item


const store = useStore()

const collapsed = computed(()=>{
  return !!!store.state.app.sidebar.opened
})

</script>