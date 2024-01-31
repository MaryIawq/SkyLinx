/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import Cover from "@/pages/cover-page.vue";
import Main from "@/pages/main-page.vue";
const routes = [
  {path: '/', name: 'cover', component: Cover},
  {path: '/main', name: 'main', component: Main},
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
