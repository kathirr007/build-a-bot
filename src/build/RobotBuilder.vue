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
      <button @click="selectPreviousPart('heads', 'selectedHeadIndex')" class="prev-selector">
        &#9668;
      </button>
      <button @click="selectNextPart('heads', 'selectedHeadIndex')" class="next-selector">
        &#9658;
      </button>
    </div>
  </div>
  <div class="middle-row">
    <div class="left part">
      <img :src="selectedRobot.leftArm.imageUrl" alt="left arm" />
      <button  @click="selectPreviousPart('arms', 'selectedLeftArmIndex')" class="prev-selector">
        &#9650;
      </button>
      <button
      @click="selectNextPart('arms', 'selectedLeftArmIndex')"
       class="next-selector">&#9660;</button>
    </div>
    <div class="center part">
      <img :src="selectedRobot.torso.imageUrl" alt="torso" />
      <button
      @click="selectNextPart('torsos', 'selectedTorsoIndex')"
       class="prev-selector">&#9668;</button>
      <button
      @click="selectNextPart('torsos', 'selectedTorsoIndex')"
       class="next-selector">&#9658;</button>
    </div>
    <div class="right part">
      <img :src="selectedRobot.rightArm.imageUrl" alt="right arm" />
      <button
      @click="selectNextPart('arms', 'selectedRightArmIndex')"
       class="prev-selector">&#9650;</button>
      <button
      @click="selectNextPart('arms', 'selectedRightArmIndex')"
       class="next-selector">&#9660;</button>
    </div>
  </div>
  <div class="bottom-row">
    <div class="bottom part">
      <img :src="selectedRobot.base.imageUrl" alt="base" />
      <button
      @click="selectNextPart('bases', 'selectedBaseIndex')"
       class="prev-selector">&#9668;</button>
      <button
      @click="selectNextPart('bases', 'selectedBaseIndex')"
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

<script>
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

export default {
  name: 'RobotBuilder',
  data() {
    return {
      availableParts: parts,
      selectedHeadIndex: 0,
      selectedLeftArmIndex: 0,
      selectedTorsoIndex: 0,
      selectedRightArmIndex: 0,
      selectedBaseIndex: 0,
      cart: [],
    };
  },
  computed: {
    selectedRobot() {
      return {
        head: this.availableParts.heads[this.selectedHeadIndex],
        leftArm: this.availableParts.arms[this.selectedLeftArmIndex],
        torso: this.availableParts.torsos[this.selectedTorsoIndex],
        rightArm: this.availableParts.arms[this.selectedRightArmIndex],
        base: this.availableParts.bases[this.selectedBaseIndex],
      };
    },
  },
  methods: {
    toCurrency,
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost + robot.leftArm.cost
        + robot.torso.cost + robot.rightArm.cost
        + robot.base.cost;

      this.cart.push({ ...robot, cost });
    },
    selectNextPart(partName = 'heads', partIndex = 'selectedHeadIndex') {
      this[partIndex] = getNextValidIndex(
        this[partIndex],
        this.availableParts[partName].length,
      );
    },
    selectPreviousPart(partName = 'heads', partIndex = 'selectedHeadIndex') {
      this[partIndex] = getPreviousValidIndex(
        this[partIndex],
        this.availableParts[partName].length,
      );
    },
  },
};
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
</style>
