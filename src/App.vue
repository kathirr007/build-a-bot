<template>
  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <img src="./assets/build-a-bot-logo.png" alt="logo" class="logo" />
          Build-a-Bot
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <!-- <HomePage msg="Welcome to Your Vue.js App"/> -->
    <!-- <div class="robot-builder">
    </div> -->
    <RobotBuilder />
  </main>
</template>

<script>
import HomePage from './home/HomePage.vue';
import RobotBuilder from './build/RobotBuilder.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    RobotBuilder,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
</style>

<style scoped lang="scss">

:deep(.robot-builder) {
  .add-to-cart {
    color: red;
  }
}

main {
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  width: calc(100% - 60px);
  min-height: 300px;
}

header {
  background-color: #999;
  width: 100%;
  margin: 0 auto;
}

ul {
  padding: 3px;
  display: flex;
}

.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}

.logo {
  vertical-align: middle;
  height: 30px;

}
</style>
