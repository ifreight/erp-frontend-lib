import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import InputView from '../views/InputView.vue';
import ButtonView from '../views/ButtonView.vue';
import TextAreaView from '../views/TextAreaView.vue';
import DialogView from '../views/DialogView.vue';
import TabsView from '../views/TabsView.vue';
import DropdownView from '../views/DropdownView.vue';
import InputTelView from '../views/InputTelView.vue';
import RadioView from '../views/RadioView.vue';
import CheckboxView from '../views/CheckboxView.vue';
import PaginationView from '../views/PaginationView.vue';
import InputSuggestionView from '../views/InputSuggestionView.vue';

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
      path: '/textarea',
      name: 'textarea',
      component: TextAreaView,
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: DialogView,
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView,
    },
    {
      path: '/dropdown',
      name: 'dropdown',
      component: DropdownView,
    },
    {
      path: '/input-tel',
      name: 'inputTel',
      component: InputTelView,
    },
    {
      path: '/pagination',
      name: 'pagination',
      component: PaginationView,
    },
    {
      path: '/suggestion',
      name: 'suggestion',
      component: InputSuggestionView,
    },
  ],
});

export default router;
