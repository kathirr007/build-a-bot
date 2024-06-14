import { createWebHashHistory, createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/home/HomePage.vue';
import RobotBuilder from '@/build/RobotBuilder.vue';
import ProductSearch from '@/search/ProductSearch.vue';
import PartInfo from '@/parts/PartInfo.vue';

export default createRouter({
  linkActiveClass: 'active-link',
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
      name: 'Home',
    },
    {
      path: '/build',
      component: RobotBuilder,
      name: 'Build',
    },
    {
      path: '/search',
      component: ProductSearch,
      name: 'Search',
    },
    {
      path: '/parts/:partType/:id',
      component: PartInfo,
      name: 'Parts',
      props: true,
    },
  ],
});
