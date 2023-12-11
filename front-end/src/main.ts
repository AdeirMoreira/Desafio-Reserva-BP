import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Vuesax from 'vuesax3'

import 'vuesax3/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';

import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)


app.use(pinia)
app.use(router)

app.use(Vuesax, {
    // options her
  })

// Adicione a propriedade ao protótipo do Vue

app.mount('#app')
