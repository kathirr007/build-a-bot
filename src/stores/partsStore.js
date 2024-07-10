import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const usePartsStore = defineStore(
  'parts',
  () => {
    const parts = ref(null);
    const loadingParts = ref(false);

    const getParts = async () => {
      if (parts.value !== null) return;
      loadingParts.value = true;
      const partsRes = await fetch('/api/parts');
      parts.value = await partsRes.json();
      loadingParts.value = false;
    };

    return {
      parts,
      getParts,
      loadingParts,
    };
  },
  { persist: true },
);
