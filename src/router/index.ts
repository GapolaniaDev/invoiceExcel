import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import ExploreContainer from '../components/ExploreContainer.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: ExploreContainer,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'radio',
        component: () => import('../views/RadioPage.vue'),
      },
      {
        path: 'library',
        component: () => import('../views/LibraryPage.vue'),
      },
      {
        path: 'search',
        component: () => import('../views/SearchPage.vue'),
      },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
