import { ref } from "vue";
const panier = ref([])
if(localStorage.getItem("panier") === null || JSON.parse(localStorage.getItem("panier")) === null)
    panier.value = []
else
    panier.value = JSON.parse(localStorage.getItem("panier"))

const setCart = function (value){
    localStorage.setItem("panier", JSON.stringify(value))
}

const useCart = function ()  {
    return { panier, setCart }
}

export default useCart