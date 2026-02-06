import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { WagmiPlugin } from '@wagmi/vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import { config } from './lib/wagmi'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(WagmiPlugin, { config })
app.use(VueQueryPlugin, { queryClient: new QueryClient() })

app.mount('#app')
