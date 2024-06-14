<template>
  <div class="header">
    <span tabindex="0" v-if="open" @click="open = !open" @keyup.enter="open = !open">
      <slot name="collapse">&#x25B2; Collapse</slot>
    </span>
    <span tabindex="0" v-if="!open" @click="open = !open" @keyup.enter="open = !open">
      <slot name="expand">&#x25BC; Expand</slot>
    </span>
  </div>
  <slot v-if="open" />
</template>

<script setup>
import { ref } from 'vue';

const open = ref(true);
</script>

<style lang="scss" scoped>
.header {
  background-color: #bbb;
  padding: 3px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
