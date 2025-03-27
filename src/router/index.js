import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InputView from '../views/InputView.vue'
import ButtonView from '../views/ButtonView.vue'
import DialogView from '../views/DialogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/input',
      name: 'input',
      component: InputView,
    },
    {
      path: '/button',
      name: 'button',
      component: ButtonView,
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: DialogView,
    },
  ],
})

export default router
