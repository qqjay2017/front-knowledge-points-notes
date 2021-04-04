<template>
  <SvgIcon :icon-class="props.icon" />
  <span v-if="props.title"> {{ props.title }} </span>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import SvgIcon from "/@/components/SvgIcon/SvgIcon.vue";
export default defineComponent({
  name: "MenuItem",
  components: {
    SvgIcon,
  },
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
    const iconClass = computed(() => {
      if (props.icon) {
        return `/@/icons/svg/${props.icon}.svg`;
      } else {
        return "";
      }
    });
    return {
      props,
      iconClass,
    };
  },
});
</script>
