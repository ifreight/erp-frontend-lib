import './assets/global.css';
import './assets/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import InputTelStore from './components/input-tel/store';

InputTelStore.setCountryList(
  fetch('http://erpff-api-dev.eljirehteknologi.com/api/v1/country', {
    methods: 'GET',
  })
    .then((response) => response.text())
    .then((response) => JSON.parse(response)),
);
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
