<template>
  <div :class="{ 'has-logo': showLogo }">
    {{ showLogo }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const showLogo = computed(() => {
  return store.state.settings.sidebarLogo;
});
</script>
