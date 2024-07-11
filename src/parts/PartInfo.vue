<template>
  <h1>{{ part.title }}</h1>
  <div>
    {{ part.description }}
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import parts from '@/data/parts';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps(['partType', 'id']);

const part = computed(() => {
  // const { partType, id } = route.params;
  const { partType, id } = props;
  return parts[partType].find((item) => item.id === +id);
});
</script>

<style lang="scss" scoped>

</style>
