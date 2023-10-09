import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faLocationPin, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPhone);
library.add(faLocationPin);
library.add(faEnvelope);
library.add(faLock);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
