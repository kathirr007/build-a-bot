<template>
<div class="content">
  <button @click="addToCart()" class="add-to-cart">
    Add to Cart
  </button>
  <div class="top-row">
    <div class="top part">
      <div class="robot-name">{{ selectedRobot.head.title }}
        <span v-if="selectedRobot.head.onSale" class="sale">
          Sale!
        </span>
      </div>
      <img :src="selectedRobot.head.imageUrl" alt="head" />
      <button @click="selectPreviousPart('heads', 'head')" class="prev-selector">
        &#9668;
      </button>
      <button @click="selectNextPart('heads', 'head')" class="next-selector">
        &#9658;
      </button>
    </div>
  </div>
  <div class="middle-row">
    <div class="left part">
      <img :src="selectedRobot.leftArm.imageUrl" alt="left arm" />
      <button  @click="selectPreviousPart('arms', 'leftArm')" class="prev-selector">
        &#9650;
      </button>
      <button
      @click="selectNextPart('arms', 'leftArm')"
       class="next-selector">&#9660;</button>
    </div>
    <div class="center part">
      <img :src="selectedRobot.torso.imageUrl" alt="torso" />
      <button
      @click="selectNextPart('torsos', 'torso')"
       class="prev-selector">&#9668;</button>
      <button
      @click="selectNextPart('torsos', 'torso')"
       class="next-selector">&#9658;</button>
    </div>
    <div class="right part">
      <img :src="selectedRobot.rightArm.imageUrl" alt="right arm" />
      <button
      @click="selectNextPart('arms', 'rightArm')"
       class="prev-selector">&#9650;</button>
      <button
      @click="selectNextPart('arms', 'rightArm')"
       class="next-selector">&#9660;</button>
    </div>
  </div>
  <div class="bottom-row">
    <div class="bottom part">
      <img :src="selectedRobot.base.imageUrl" alt="base" />
      <button
      @click="selectNextPart('bases', 'base')"
       class="prev-selector">&#9668;</button>
      <button
      @click="selectNextPart('bases', 'base')"
       class="next-selector">&#9658;</button>
    </div>
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
  computed, getCurrentInstance, reactive, ref,
} from 'vue';
import parts from '../data/parts';
import { toCurrency } from '../shared/formatters';

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

const selectedRobot = computed(() => ({
  head: availableParts.value.heads[selectedIndex.head],
  leftArm: availableParts.value.arms[selectedIndex.leftArm],
  torso: availableParts.value.torsos[selectedIndex.torso],
  rightArm: availableParts.value.arms[selectedIndex.rightArm],
  base: availableParts.value.bases[selectedIndex.base],
}));

const addToCart = () => {
  const robot = selectedRobot.value;
  const cost = robot.head.cost + robot.leftArm.cost
        + robot.torso.cost + robot.rightArm.cost
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

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 206px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 206px;
}

.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  right: -3px;
}

.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.content {
  position: relative;
}

.add-to-cart {
  position: absolute;
  right: 30px;
  width: 220px;
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
