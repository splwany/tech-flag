import { createApp } from 'vue'
// import router from './router'
// import Menus from 'vue3-menus'
import App from './App.vue'
import { Icon } from '@iconify/vue'

const app = createApp(App)
// app.use(router)
// app.use(Menus)
app.component('Icon', Icon)
app.mount('#app')
