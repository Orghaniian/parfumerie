import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Catalogue from "../views/Catalogue.vue";
import Ajouter from "../views/Ajouter.vue";
import Inscrire from "../views/Inscrire.vue";
import Article from "@/views/Article";
import Clients from "../views/Clients.vue";
import Client from "../views/Client.vue";
import Connexion from "@/views/Connexion";

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
    path: "/clients",
    name: "Clients",
    component: Clients
  },
  {
    path: "/client/:id",
    name: "Client",
    component: Client,
    props: true
  },
  {
    path: "/ajouter",
    name: "Ajouter",
    component: Ajouter
  },
  {
    path: "/inscrire",
    name: "Inscrire",
    component: Inscrire
  },
  {
    path: "/article/:no",
    name: "Article",
    component: Article,
    props: true
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
