import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Importation du client HTTP Axios
import axios from 'axios';

// Fonction qui interroge l'API SpaceX
async function fetchAPI() {
  // Tentative d'interaction avec l'API SpaceX v5
    try {
    const response = await axios.get('https://api.spacexdata.com/v5/launches');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des lancements de l\'entreprise SpaceX:', error);
  }
}
createApp(App).mount('#app')
