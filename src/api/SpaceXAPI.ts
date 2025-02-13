import axios from "axios";

const api = axios.create ({
    baseURL: 'https://api.spacexdata.com/v5/'
});

// Fonction qui récupère les infos du prochain lancement
const fetchNextLaunches = async (value: string) => {
    const res = await api.get('launches/next')
    return res.data
};

// Fonction qui récupère les infos de tous les lancements
const fetchAllLaunches = async () => {
    const res = await api.get('launches');
    return res.data
};

export default fetchNextLaunches; fetchAllLaunches;
