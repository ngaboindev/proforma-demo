import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import JsonViewer from 'vue-json-viewer'

// Import JsonViewer as a Vue.js plugin

import ProformajsVue from '@openclinical/proformajs-vue3-perform'

const app = createApp(App)

app.use(ProformajsVue)
app.use(JsonViewer)

app.use(createPinia())
app.use(router)

app.mount('#app')
