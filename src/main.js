/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
const app = createApp(App).use(autoAnimatePlugin)
registerPlugins(app)

app.mount('#app')
