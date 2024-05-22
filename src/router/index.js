import { createRouter, createWebHistory } from "vue-router";


import ExamplePage from '../components/ExamplePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: ExamplePage,
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
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
