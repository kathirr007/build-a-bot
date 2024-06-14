<template>
<div class="content">
  <div class="preview" v-if="selectedRobot">
    <CollapsibleSection>
      <template v-slot:collapse>
        &#x25B2; Hide
      </template>
      <template v-slot:expand>
        &#x25BC; Show
      </template>
      <div class="preview-content">
        <div class="top-row">
          <!-- {{ selectedRobot.head.id }} -->
          <img alt="head" :src="selectedRobot.head.imageUrl" />
        </div>
        <div class="middle-row">
          <!-- {{ selectedRobot.leftArm.id }} -->
          <img alt="leftArm" :src="selectedRobot.leftArm.imageUrl" class="rotate-left" />
          <img alt="torsos" :src="selectedRobot.torsos.imageUrl" />
          <img alt="rightArm" :src="selectedRobot.rightArm.imageUrl" class="rotate-right" />
        </div>
        <div class="bottom-row">
          <img alt="base" :src="selectedRobot.base.imageUrl" />
        </div>
      </div>
    </CollapsibleSection>
    <button @click="addToCart()" class="add-to-cart">
      Add to Cart
    </button>
  </div>
  <div class="top-row">
      <div class="robot-name">{{ selectedRobot.head.title }}
        <span v-if="selectedRobot.head.onSale" class="sale">
          Sale!
        </span>
      </div>
      <PartSelector position="top" :part-name="'heads'"
      @part-selected="part => selectedRobot.head = part" />
  </div>
  <div class="middle-row">
    <PartSelector position="left" :part-name="'arms'"
    @part-selected="part => selectedRobot.leftArm = part" />
    <PartSelector position="center"  :part-name="'torsos'"
    @part-selected="part => selectedRobot.torsos = part" />
    <PartSelector position="right" :part-name="'arms'"
    @part-selected="part => selectedRobot.rightArm = part" />
  </div>
  <div class="bottom-row">
    <PartSelector position="bottom" :part-name="'bases'"
    @part-selected="part => selectedRobot.base = part" />
  </div>
</div>
<div>
  <h1>Cart</h1>
  <table>
    <thead>
      <tr>
        <th>Robot</th>
        <th class="cost">Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(robot, index) in cart" :key="index">
        <td>{{ robot.head.title }}</td>
        <td class="cost">{{ toCurrency(robot.cost) }}</td>
      </tr>
    </tbody>
  </table>

</div>
</template>

<script setup>
import {
  computed, reactive, ref,
} from 'vue';
import CollapsibleSection from '@/shared/CollapsibleSection.vue';
import parts from '../data/parts';
import { toCurrency } from '../shared/formatters';
import PartSelector from './PartSelector.vue';

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

function getPreviousValidIndex(index, length) {
  const decrementedIndex = index - 1;
  return decrementedIndex < 0 ? length - 1 : decrementedIndex;
}

const availableParts = ref(parts);
/* const selectedHeadIndex = ref(0);
const selectedLeftArmIndex = ref(0);
const selectedTorsoIndex = ref(0);
const selectedRightArmIndex = ref(0);
const selectedBaseIndex = ref(0); */
const selectedIndex = reactive({
  head: 0,
  leftArm: 0,
  torso: 0,
  rightArm: 0,
  base: 0,
});
const cart = ref([]);

// const instance = getCurrentInstance();

const selectedRobot = ref({
  head: {},
  leftArm: {},
  torsos: {},
  rightArm: {},
  base: {},
});

// console.log(selectedRobot.value);

const addToCart = () => {
  const robot = selectedRobot.value;
  const cost = robot.head.cost + robot.leftArm.cost
        + robot.torsos.cost + robot.rightArm.cost
        + robot.base.cost;

  cart.value.push({ ...robot, cost });
};
const selectNextPart = (partName = 'heads', partIndex = 'head') => {
  /* instance.setupState[partIndex] = getNextValidIndex(
    instance.setupState[partIndex],
    availableParts.value[partName].length,
  ); */
  selectedIndex[partIndex] = getNextValidIndex(
    selectedIndex[partIndex],
    availableParts.value[partName].length,
  );
};
const selectPreviousPart = (partName = 'heads', partIndex = 'head') => {
  /* instance.setupState[partIndex] = getPreviousValidIndex(
    instance.setupState[partIndex],
    availableParts.value[partName].length,
  ); */
  selectedIndex[partIndex] = getPreviousValidIndex(
    selectedIndex[partIndex],
    availableParts.value[partName].length,
  );
};

/* export default {
  name: 'RobotBuilder',
  data() {
    return {
    };
  },
  computed: {

  },
  methods: {
    toCurrency,

  },
}; */
</script>

<style lang="scss" scoped>
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 230px;
  height: 230px;
  padding: 5px;
}

.preview-content {
  border: 1px solid #999;
  padding: 5px;
}

.preview img {
  width: 45px;
  height: 45px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}

.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
}

.part img {
  width: 200px;
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.robot-name {
  position: absolute;
  top: 5px;
  text-align: center;
  width: 100%;
}

.content {
  position: relative;
  padding-top: 1.5rem;
}

.add-to-cart {
  position: absolute;
  /* right: 30px; */
  width: 230px;
  padding: 3px;
  font-size: 16px;
}

td,th {
  text-align: left;
  padding: 5px;
  padding-right: 2px;
}

.cost {
  text-align: right;
}

.sale {
  color: darkmagenta;
  font-weight: bold;
}
</style>
