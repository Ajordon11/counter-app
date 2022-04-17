import { createApp } from 'vue'
import DisplayApp from './DisplayApp.vue'
require('../assets/main.scss')

const app = createApp(DisplayApp);
app.mount('#app');
