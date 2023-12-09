import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { useStore} from '@/stores'

const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: () => import('@/views/LoginView.vue') },
  { path: '/signin', name: 'SignIn', component: () => import('@/views/SignInView.vue') },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();

  // Se a rota requer autenticação
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    
    // Se o usuário NÃO está autenticado e NÃO está na página de login
    
    if (!store.auth.isAuthenticated && to.path !== '/login') {

      // Interromper a navegação e redirecionar para a página de login
      return next('/login');
    }
  }

  // Continue com a navegação normal
  next();
});

export default router;