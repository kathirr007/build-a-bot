import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref([]);
    const lastRobotCost = ref(0);

    // eslint-disable-next-line no-return-assign, no-param-reassign
    const cartTotal = computed(() => cart.value.reduce((acc, curr) => acc += curr.cost, 0));

    return {
      cart,
      lastRobotCost,
      cartTotal,
    };
  },
  { persist: true },
);
