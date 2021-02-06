<template>
  <SearchBar @load="load" :select-options="{
    asc: 'date croissant',
    desc: 'date décroissant',
    num: 'numero'
  }">

    
  </SearchBar>
  <button class="btn" @click="telechargerCommandes">Télécharger les commandes</button>
  <label for="fileType">Format: </label>
  <select name="fileType" id="fileType" v-model="fileFormat">
    <option value="xlsx">Excel ".xlsx"</option>
    <option value="ods">OpenDocument ".ods"</option>
  </select>
  <p>{{ commandes.length }} Resultat(s) pour: {{ numRef }}</p>
  <div class="card-container">
    <div v-for="commande in commandes" :key="commande.id">
      <CommandesItem :commande="commande"/>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import SearchBar from "@/components/SearchBar";
import CommandesItem from "@/components/CommandesItem";
import XLSX from "xlsx";
import { saveAs } from "file-saver"

export default {
  name: "Commandes",
  components: {CommandesItem, SearchBar },
  setup() {
    const commandes = ref([]);
    const numRef = ref("")
    const fileFormat = ref("xlsx")

    const load = function (e = {}) {
      const { tri, num } = e
      numRef.value = num
      let query = "http://localhost:4040/commandes?";
      if (num && num !== "" ) query += `&no_commande=${num}`;
      if (tri && tri !== "") query += `&orderBy=${tri}`
      fetch(query).then((response) => {
        response.json().then((data) => (commandes.value = data.data));
      });
    };

    onMounted(() => {
      load();
    });

    const telechargerCommandes = async function (){
      const workBook = XLSX.utils.book_new()
      workBook.props = {
        Title: `Commandes}`,
        Subject: `Commandes du site Lalavande`,
        Author: "Lalavande",
        CreatedDate: new Date()
      }
      workBook.SheetNames.push(`Commandes`)
      const data = [
        [
            'No. Commande',
            'Status',
            'Client',
            'No. Client',
            'Date',
            'Articles',// quantité x noms
            'Status des articles',
            'Date d\'envoi',
            'Date d\'arrivée',
            'No. Colis',
            'Frais de livraison'
        ]
      ]
      for ( const commande of commandes.value ){
        const dataCommande = (await (await fetch(`http://localhost:4040/commande/${commande.No_commande}`)).json()).data
        data.push([
            dataCommande.No_commande,
            dataCommande.Statut,
            "nom client",
            dataCommande.Code_client,
            dataCommande.Date_commande,
            dataCommande.articles.reduce((str, article) => str += article.Quantite + " x " + article.nom + "\n", ""),
            dataCommande.articles.reduce((str, article) => str += article.Statut + "\n", ""),
            dataCommande.articles.reduce((str, article) => str += article.Date_envoie + "\n", ""),
            dataCommande.articles.reduce((str, article) => str += article.Date_arrive + "\n", ""),
            dataCommande.articles.reduce((str, article) => str += article.No_colis + "\n", ""),
            dataCommande.Frais_livraison
        ])
      }
      workBook.Sheets[`Commandes`] = XLSX.utils.aoa_to_sheet(data)
      const binary = XLSX.write(workBook, {bookType: `${fileFormat.value}`, type: 'binary'})

      const buf = new ArrayBuffer(binary.length); //convert s to arrayBuffer
      const view = new Uint8Array(buf);  //create uint8array as viewer
      for (let i=0; i<binary.length; i++) view[i] = binary.charCodeAt(i) & 0xFF; //convert to octet
      saveAs(new Blob([buf],{type:"application/octet-stream"}), `Commandes_clients.${fileFormat.value}`);
    }

    return { commandes, load, numRef, telechargerCommandes, fileFormat};
  },
};
</script>