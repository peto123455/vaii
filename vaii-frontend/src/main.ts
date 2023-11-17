import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faLocationPin, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add([faEnvelope, faPhone, faLocationPin, faEnvelope, faLock, faUser]);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
