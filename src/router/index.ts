import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import DetailPage from '../views/DetailPage.vue';
import RandomPage from '../views/RandomPage.vue';
import Categories from '../views/Categories.vue';
Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/detail-page/:movie_id',
    name: 'Detail Page',
    component: DetailPage,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/random-page',
    name: 'Random Page',
    component: RandomPage,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
