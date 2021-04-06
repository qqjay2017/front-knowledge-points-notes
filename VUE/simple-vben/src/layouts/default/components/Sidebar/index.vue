<template>
     <LayoutSider :collapsed="collapsed" :trigger="null" collapsible>
     <Logo :collapse="collapsed" />
      <Menu theme="dark" mode="inline" :selectedKeys="selectedKeys" @update:selectedKeys="changeSelectedKeys">
        <MenuItem key="1">
       
          <span>nav 1</span>
          <span>11111111111111</span>
        </MenuItem>
        <MenuItem key="2">
        
          <span>nav 2</span>
          <span>2222222222222</span>
        </MenuItem>
        <MenuItem key="3">
          
          <span>nav 3</span>
          <span>23333333333</span>
        </MenuItem>
      </Menu>
    </LayoutSider>
</template>



<script lang="ts" setup>
import { Layout ,Menu} from 'ant-design-vue'
import {computed, ref} from 'vue'

import { useStore } from 'vuex';
const LayoutSider = Layout.Sider
const MenuItem = Menu.Item




import Logo from './Logo.vue'

const store = useStore()

const collapsed = computed(()=>{
  return !!!store.state.app.sidebar.opened
})



const selectedKeys = ref<string[]>(["1"]);

const changeSelectedKeys = (value:string[])=>{
  console.log(value)
}

</script>