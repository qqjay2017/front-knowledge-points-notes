<template>
  <LayoutContent>
    <!-- <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <RouterView />
  </LayoutContent>
</template>

<script setup lang="ts">
import {Layout} from 'ant-design-vue'
const LayoutContent = Layout.Content
import {RouterView} from 'vue-router'

</script>
