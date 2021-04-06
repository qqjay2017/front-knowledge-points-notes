<template>
  <Layout :style="{width:'100%',height:'100%'}">
    <Siderbar />
   
     <div :style="{width:'100%',height:'100%'}">
       <Navbar />
      <AppMain />
     </div>
   
  </Layout>
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


import Siderbar from './components/Sidebar/index.vue'
import Navbar from './components/NavBar.vue'
import AppMain from './components/AppMain.vue'




</script>
