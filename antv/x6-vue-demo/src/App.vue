<template>
  <div id="" :style="{height:'100%',minHeight:'600px'}">
    
    <router-view/>
  </div>
</template>


<style  >
html,
 body {
  width: 100%;
  height: 100%;
}
.h-100 {
   height: 100%;
}
.full {
   width: 100%;
  height: 100%;
}
* {
 box-sizing: border-box;
}
</style>