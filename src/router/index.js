import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Catalogue from "../views/Catalogue.vue"
import Ajouter from "../views/Ajouter.vue"

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: "/catalogue",
    name: "Catalogue",
    component: Catalogue
  },
  {
    path: "/ajouter",
    name: "Ajouter",
    component: Ajouter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
