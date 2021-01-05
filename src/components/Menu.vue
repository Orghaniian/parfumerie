<template>
  <nav class="navbar">
    <router-link to="/">Quitter</router-link>
    <router-link to="/">Accueil</router-link>
    <div class="titre">
      <h1>Lalavande Fidelité</h1>
    </div>

    <router-link to="/">Ajouter</router-link>
    <router-link to="/">Clients</router-link>
    <router-link to="/">Options</router-link>
  </nav>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Rouge+Script");
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .titre {
    border: purple solid;
    border-radius: 20px;
    padding: 0 20px;

    h1 {
      font-family: Rouge Script;
      font-size: 60px;
      font-weight: 400;
    }
  }
}
</style>