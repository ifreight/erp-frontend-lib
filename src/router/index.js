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
import PopoverView from '../views/PopoverView.vue';
import SelectView from '../views/SelectView.vue';
import UploadView from '../views/UploadView.vue';
import ProgressView from '../views/ProgressView.vue';
import ChipView from '../views/ChipView.vue';
import AlertView from '../views/AlertView.vue';
import StickyBarView from '../views/StickyBarView.vue';
import TableView from '../views/TableView.vue';
import FileListView from '../views/FileListView.vue';
import MultipleInputView from '../views/MultipleInputView.vue';
import SelectMultipleView from '../views/SelectMultipleView.vue';
import IconsView from '../views/IconsView.vue';
import DatePickerView from '../views/DatepickerView.vue';
import SortCaretView from '../views/SortCaretView.vue';
import DrawerView from '../views/DrawerView.vue';

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
    {
      path: '/popover',
      name: 'popover',
      component: PopoverView,
    },
    {
      path: '/select',
      name: 'select',
      component: SelectView,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView,
    },
    {
      path: '/file-list',
      name: 'fileList',
      component: FileListView,
    },
    {
      path: '/progress-bar',
      name: 'progressBar',
      component: ProgressView,
    },
    {
      path: '/chip',
      name: 'chip',
      component: ChipView,
    },
    {
      path: '/alert',
      name: 'alert',
      component: AlertView,
    },
    {
      path: '/sticky-bar',
      name: 'stickyBar',
      component: StickyBarView,
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
    },
    {
      path: '/multiple-input',
      name: 'multipleInput',
      component: MultipleInputView,
    },
    {
      path: '/multiple-select',
      name: 'multipleSelect',
      component: SelectMultipleView,
    },
    {
      path: '/icons',
      name: 'icons',
      component: IconsView,
    },
    {
      path: '/datepicker',
      name: 'datepicker',
      component: DatePickerView,
    },
    {
      path: '/sort-caret',
      name: 'sort-caret',
      component: SortCaretView,
    },
    {
      path: '/drawer',
      name: 'drawer',
      component: DrawerView,
    },
  ],
});

export default router;
