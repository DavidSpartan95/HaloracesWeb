import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Change the background color to #242424 and text color to white
document.body.style.backgroundColor = '#131313';
document.body.style.color = 'white';

