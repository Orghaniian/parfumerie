import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Catalogue from "../views/Catalogue.vue";
import Ajouter from "../views/Ajouter.vue";
import Inscrire from "../views/Inscrire.vue";
import Article from "@/views/Article";
import Clients from "../views/Clients.vue";
import Client from "../views/Client.vue";
import Connexion from "@/views/Connexion";
import isConnected from "@/utils/isConnected";
import isAdmin from "@/utils/isAdmin";
import Profil from "@/views/Profil";
import Panier from "@/views/Panier";

const requireAdmin = (to, from, next) => {
  if(!isAdmin())
    if(!isConnected())
      next({ name: "Connexion" })
    else
      next({ name: "Accueil" })
  else
    next()
}

const requireAuth = (to, from, next) => {
  if (!isConnected())
    next({ name: "Connexion" })
  else
    next()
}

const requireNoAuth = (to, from, next) => {
  if (isConnected())
    next({ name: "Accueil" })
  else
    next()
}

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: "/catalogue",
    name: "Catalogue",
    component: Catalogue,
    beforeEnter: requireAuth
  },
  {
    path: "/clients",
    name: "Clients",
    component: Clients,
    beforeEnter: requireAdmin
  },
  {
    path: "/client/:id",
    name: "Client",
    component: Client,
    props: true,
    beforeEnter: requireAdmin
  },
  {
    path: "/ajouter",
    name: "Ajouter",
    component: Ajouter,
    beforeEnter: requireAdmin
  },
  {
    path: "/inscrire",
    name: "Inscrire",
    component: Inscrire,
    beforeEnter: requireAdmin
  },
  {
    path: "/article/:no",
    name: "Article",
    component: Article,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
    beforeEnter: requireAuth
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
    beforeEnter: requireNoAuth
  },
  {
    path: "/panier",
    name: "Panier",
    component: Panier,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
