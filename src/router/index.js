import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InputView from '../views/InputView.vue'
import ButtonView from '../views/ButtonView.vue'
import RadioView from '../views/RadioView.vue'
import CheckboxView from '../views/CheckboxView.vue'
import TabsView from '../views/TabsView.vue'

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
      path: '/radio',
      name: 'radio',
      component: RadioView,
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: CheckboxView,
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
    },
  ],
})

export default router
