import { createRouter, createWebHistory } from '@ionic/vue-router';
import ExploreContainer from '../components/ExploreContainer.vue';

const routes = [
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
        path: 'details',
        component: () => import('../views/DetailsPage.vue'),
      },
      {
        path: 'view',
        component: () => import('../views/ViewPage.vue'),
      },
      {
        path: 'export',
        component: () => import('../views/ExportPage.vue'),
      },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
