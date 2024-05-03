import { createApp } from 'vue';
import App from './App.vue';

// new Vue({
//   el: '#root',
//   data: {},
//   components: {
//     App,
//   },
//   template: `<App></App>`,
// });
const app = createApp(App);
app.mount('#app');

/* import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app') */
