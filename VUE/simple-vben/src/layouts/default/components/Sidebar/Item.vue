<template>
  <div>
    <span> {{ props.title }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
