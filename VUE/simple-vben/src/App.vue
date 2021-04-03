<template>
  <input type="text" placeholder="placeholder" class="input" />
</template>

<script setup lang="ts">
import { reactive } from "vue";

const a = reactive({
  a: "111",
});
fetch("/api/get")
  .then((res) => res.json())
  .then((users) => console.log(users));
</script>

<style lang="scss" scoped>
.input {
  font-size: 29px;
  &::placeholder {
    color: deeppink;
  }
}
</style>
