<template>
  <layout :style="{width:'100%',height:'100%'}">
    <Siderbar />
    <layout>
     <Navbar />
      <AppMain />
    </layout>
  </layout>
</template>

<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

import { Layout } from 'ant-design-vue'


import Siderbar from './components/Sidebar/Siderbar.vue'
import Navbar from './components/NavBar.vue'
import AppMain from './components/AppMain.vue'

import {  ref } from "vue";

const selectedKeys = ref<string[]>(["1"]);



</script>
