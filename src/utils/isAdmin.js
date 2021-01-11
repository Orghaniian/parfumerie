import isConnected from "@/utils/isConnected";

const isAdmin = () => {
    return isConnected() && JSON.parse(localStorage.getItem("utilisateur")).Admin
}

export default isAdmin