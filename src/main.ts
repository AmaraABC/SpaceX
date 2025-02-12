// Importation du client HTTP Axios
import axios from 'axios';

// Le lien de l'API
const SpaceXAPI = 'https://api.spacexdata.com/v5/launches';

// Fonction qui interroge l'API SpaceX afin de récupérer tous les lancements
export const getAllLaunches = async (filter: string) => {
  try {
    const res = await axios.get(`${SpaceXAPI}?filter=${filter}`);
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des lancements de l\'entreprise SpaceX:', error);
    return [];
  }
};

// Fonction qui interroge l'API SpaceX pour récupérer le prochain lancement
export const getNextLaunch = async () => {
  try {
    const res = await axios.get(`${SpaceXAPI}/next`);
    return res.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des lancements de l\'entreprise SpaceX:', error);
    return null;
  }
};
