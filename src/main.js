import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles.css';

import BaseButton from './components/BaseButton.vue';
import BaseAlert from './components/BaseAlert.vue';
import BaseLoading from './components/BaseLoading.vue';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('BaseButton', BaseButton);
app.component('BaseAlert', BaseAlert);
app.component('BaseLoading', BaseLoading);
app.mount('#app');