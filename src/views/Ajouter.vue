<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="nom">Nom</label>
      <input type="text" name="nom" id="nom" v-model="form.nom" required/>
    </div>
    <div>
      <label for="quantite">Quantité</label>
      <input type="number" name="quantite" id="quantite" v-model="form.quantite_en_stock" required/>
    </div>
    <div>
      <label for="prix">Prix</label>
      <input type="number" step="0.01" name="prix" id="prix" v-model="form.prix_unitaire" required/>
    </div>
    <div>
      <label for="disponible">Disponible</label>
      <input type="checkbox" name="disponible" id="disponible" v-model="form.disponible"/>
    </div>
    <div>
      <label for="cadeau">En cadeau</label>
      <input type="checkbox" name="cadeau" id="cadeau" v-model="form.en_cadeau"/>
    </div>
    <div>
      <label for="echangeable">Échangeable</label>
      <input type="checkbox" name="echangeable" id="echangeable" v-model="form.echangeable" />
    </div>
    <button type="submit">Ajouter</button>
  </form>
  <p v-if="idArticleAjoute">Article ajouté ! n°{{ idArticleAjoute }}</p>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Ajouter",
  setup() {
    document.title = `Ajouter`
    const form = ref({
        nom: "",
        quantite_en_stock: 0,
        prix_unitaire: 0,
        disponible: false,
        en_cadeau: false,
        echangeable: false
    })

    const idArticleAjoute = ref(null)

    const handleSubmit = function () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const options = {
            method: "POST",
            body: JSON.stringify({ ...form.value }),
            headers: myHeaders
        }

        fetch("http://localhost:4040/article", options)
            .then((reponse) => reponse.json().then((data) => idArticleAjoute.value = data.no_article))

        form.value = {
            nom: "",
            quantite_en_stock: 0,
            prix_unitaire: 0,
            disponible: false,
            en_cadeau: false,
            echangeable: false
        }
    };
    return { handleSubmit, form, idArticleAjoute };
  }
}
</script>

<style>
</style>