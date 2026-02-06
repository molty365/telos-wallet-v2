import { createRouter, createWebHistory } from 'vue-router'
import { getAccount } from '@wagmi/core'
import { config } from '@/lib/wagmi'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('@/views/WalletView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/send',
      name: 'send',
      component: () => import('@/views/SendView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/receive',
      name: 'receive',
      component: () => import('@/views/ReceiveView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/stake',
      name: 'stake',
      component: () => import('@/views/StakeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/views/HistoryView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Auth guard
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const account = getAccount(config)
    if (!account.isConnected) {
      next('/')
      return
    }
  }
  next()
})

export default router
